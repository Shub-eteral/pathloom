import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Missing SUPABASE_URL or SUPABASE_KEY in .env")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(url, key)

def get_db_lookup(table_name, key_col="name", val_col="id"):
    """Helper to fetch a table and return a mapping of name -> id"""
    response = supabase.table(table_name).select(f"{key_col},{val_col}").execute()
    return {item[key_col]: item[val_col] for item in response.data}

def seed_domains():
    print("Seeding domains...")
    with open("../database/seed/domains.json", encoding="utf-8") as f:
        domains = json.load(f)
    
    # Supabase upsert requires unique columns (which name is) to avoid duplicates
    response = supabase.table("domains").upsert(domains, on_conflict="name").execute()
    print(f"Inserted/Updated {len(response.data)} domains.")

def seed_roles():
    print("Seeding roles...")
    with open("../database/seed/roles.json", encoding="utf-8") as f:
        roles_data = json.load(f)
        
    # Get domain IDs
    domain_lookup = get_db_lookup("domains")
    
    # Process roles to replace domain_name with domain_id
    for role in roles_data:
        domain_name = role.pop("domain_name", None)
        if domain_name and domain_name in domain_lookup:
            role["domain_id"] = domain_lookup[domain_name]
            
    # Need to query existing roles first because upsert on roles requires a unique constraint on 'name'
    # Actually, we didn't put a UNIQUE constraint on roles(name) in the schema, but we should handle it
    # We'll just insert for now. If you re-run this, it will duplicate roles unless we clear them first.
    # Let's clear the table first for a clean seed
    
    supabase.table("roles").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
    
    response = supabase.table("roles").insert(roles_data).execute()
    print(f"Inserted {len(response.data)} roles.")

if __name__ == "__main__":
    print("Starting database seed...")
    try:
        seed_domains()
        seed_roles()
        print("✅ Seed completed successfully!")
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
