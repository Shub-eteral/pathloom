const universities = [

{
  id: 1,

  country: "Japan",

  name: "University of Tokyo",

  qs_rank: 32,

  requirements: {
    gpa10: 8.5,
    gpa4: 3.4,
    ielts: 7.0,
    gre: 320,
    jlpt: "N2"
  },

  tuition: 6000,

  scholarships: true,

  employment_score: 9.8,

  programs: [

    {
      career: "Data Scientist",
      course: "Master of Data Science"
    },

    {
      career: "AI Engineer",
      course: "Master of Artificial Intelligence"
    },

    {
      career: "Data Engineer",
      course: "Master of Big Data Engineering"
    }

  ]
},

{
  id: 2,

  country: "Japan",

  name: "Kyoto University",

  qs_rank: 50,

  requirements: {
    gpa10: 8.2,
    gpa4: 3.3,
    ielts: 6.5,
    gre: 315,
    jlpt: "N2"
  },

  tuition: 5500,

  scholarships: true,

  employment_score: 9.5,

  programs: [

    {
      career: "Data Scientist",
      course: "Master of Data Analytics"
    },

    {
      career: "AI Engineer",
      course: "Master of AI Systems"
    }

  ]
},

{
  id: 3,

  country: "Germany",

  name: "Technical University of Munich",

  qs_rank: 28,

  requirements: {
    gpa10: 8.0,
    gpa4: 3.2,
    ielts: 6.5,
    gre: 310,
    jlpt: null
  },

  tuition: 1000,

  scholarships: true,

  employment_score: 9.4,

  programs: [

    {
      career: "Data Scientist",
      course: "MSc Data Engineering and Analytics"
    },

    {
      career: "AI Engineer",
      course: "MSc Artificial Intelligence"
    }

  ]
}

];

export default universities;