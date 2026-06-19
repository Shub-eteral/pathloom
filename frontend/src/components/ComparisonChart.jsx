export default function ComparisonChart({
  data
}) {

  return (

    <div className="space-y-4">

      {
        data.map((career) => (

          <div key={career.role_id}>

            <div className="flex justify-between text-sm mb-1">

              <span>
                {career.role_name}
              </span>

              <span>
                {career.readiness_score}%
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-4">

              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{
                  width:
                    `${career.readiness_score}%`
                }}
              />

            </div>

          </div>

        ))
      }

    </div>

  );

}