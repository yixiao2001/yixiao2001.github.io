// Website configuration data
const siteConfig = {
  "personal": {
    "name": "Yi Xiao",
    "title": "PhD Student",
    "affiliation": "Chongqing University",
    "research_interests": [
      "Intelligent Software Engineering",
      "Log Analytics",
      "Large Language Models"
    ],
    "email": "xiaoyi@stu.cqu.edu.cn",
    "links": [
      {
        "name": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=yiyzhSAAAAAJ&hl=en&oi=ao"
      },
      {
        "name": "GitHub",
        "url": "https://github.com/yixiao2001"
      },
      {
        "name": "ORCID",
        "url": "https://orcid.org/my-orcid?orcid=0009-0008-0958-5726"
      }
    ]
  },
  "about": [
    {
      "text": "I am a PhD student at Chongqing University. I am fortunate to be advised by Prof. <a href=\"https://sites.google.com/site/hongyujohn/\" class=\"simple-link\">Hongyu Zhang</a>."
    },
    {
      "text": "I am interested in intelligent software engineering with a focus on NLP applications for software development, operation, and maintenance. My current research topics involve intelligent log analytics, robust and green application of LLMs in software engineering."
    }
  ],
  "publications": [
    {
      "year": "2026",
      "title": "Knowledge-Augmented Log Anomaly Detection with Large Language Models",
      "authors": "Yongliang Tao, Van-Hoang Le, Hongyu Zhang, <strong>Yi Xiao</strong>",
      "venue": "Proceedings of the 48th International Conference on Software Engineering (ICSE 2026)",
      "venue_short": "ICSE 2026",
      "ccf": "CCF A",
      "method": "LogPipe",
      "description": "LogPipe: knowledge-augmented log anomaly detection with LLMs, improving detection accuracy and reliability.",
      "links": [
        {"name": "Paper", "url": "https://conf.researchr.org/details/icse-2026/icse-2026-research-track/206/Knowledge-Augmented-Log-Anomaly-Detection-with-Large-Language-Models"},
        {"name": "Code", "url": "https://github.com/LogIntelligence/LogPipe"}
      ],
      "bibtex": "@inproceedings{tao2026knowledge,\n  author = {Tao, Yongliang and Le, Van-Hoang and Zhang, Hongyu and Xiao, Yi},\n  title = {Knowledge-Augmented Log Anomaly Detection with Large Language Models},\n  booktitle = {Proceedings of the 48th International Conference on Software Engineering},\n  year = {2026},\n  publisher = {IEEE Computer Society},\n}"
    },
    {
      "year": "2026",
      "title": "TSGen: Automated Troubleshooting Guide Generation",
      "authors": "<strong>Yi Xiao</strong>, Hongyu Zhang, Daniel Genkin, Chaoyun Zhang, Rujia Wang, Chetan Bansal, Bhala Ranganathan, Saravan Rajmohan, Minghua Ma",
      "venue": "Proceedings of the ACM Conference on the Foundations of Software Engineering (FSE 2026), Industry Track",
      "venue_short": "FSE 2026",
      "ccf": "CCF A",
      "method": "TSGen",
      "description": "TSGen: automated generation of structured troubleshooting guides, reducing authoring and maintenance costs.",
      "links": [
        {"name": "DOI", "url": "https://dl.acm.org/doi/10.1145/3803437.3805239"}
      ],
      "bibtex": "@inproceedings{xiao2026tsgen,\n  author = {Xiao, Yi and Zhang, Hongyu and Genkin, Daniel and Zhang, Chaoyun and Wang, Rujia and Bansal, Chetan and Ranganathan, Bhala and Rajmohan, Saravan and Ma, Minghua},\n  title = {TSGen: Automated Troubleshooting Guide Generation},\n  booktitle = {Proceedings of the ACM Conference on the Foundations of Software Engineering, Industry Track},\n  year = {2026},\n  publisher = {ACM},\n}"
    },
    {
      "year": "2025",
      "title": "Unleashing the True Potential of Semantic-based Log Parsing with Pre-trained Language Models",
      "authors": "Van-Hoang Le, <strong>Yi Xiao</strong>, Hongyu Zhang",
      "venue": "Proceedings of the 47th International Conference on Software Engineering (ICSE 2025)",
      "venue_short": "ICSE 2025",
      "ccf": "CCF A",
      "method": "UNLEASH",
      "description": "UNLEASH: an end-to-end semantic log parsing framework that boosts parsing performance with enhancement strategies.",
      "links": [
        {"name": "DOI", "url": "https://doi.org/10.1109/ICSE55347.2025.00174"},
        {"name": "Code", "url": "https://github.com/LogIntelligence/UNLEASH"}
      ],
      "bibtex": "@inproceedings{le2025unleashing,\n  author = {Le, Van-Hoang and Xiao, Yi and Zhang, Hongyu},\n  title = {Unleashing the True Potential of Semantic-based Log Parsing with Pre-trained Language Models},\n  booktitle = {Proceedings of the 47th International Conference on Software Engineering},\n  year = {2025},\n  publisher = {IEEE Computer Society},\n}"
    },
    {
      "year": "2024",
      "title": "Demonstration-Free: Towards More Practical Log Parsing with Large Language Models",
      "authors": "<strong>Yi Xiao</strong>, Van-Hoang Le, Hongyu Zhang",
      "venue": "Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering (ASE 2024)",
      "venue_short": "ASE 2024",
      "ccf": "CCF A",
      "method": "LogBatcher",
      "description": "LogBatcher: a demonstration-free log parsing method that lowers LLM inference cost through batching.",
      "links": [
        {"name": "DOI", "url": "https://doi.org/10.1145/3691620.3694994"},
        {"name": "Code", "url": "https://github.com/LogIntelligence/LogBatcher"}
      ],
      "bibtex": "@inproceedings{xiao2024logbatcher,\n  author = {Xiao, Yi and Le, Van-Hoang and Zhang, Hongyu},\n  title = {Demonstration-Free: Towards More Practical Log Parsing with Large Language Models},\n  booktitle = {Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering},\n  pages = {153-165},\n  year = {2024},\n  publisher = {ACM},\n}"
    }
  ],
  "projects_org": {
    "name": "LogIntelligence",
    "url": "https://github.com/LogIntelligence"
  },
  "experience": [
    {
      "period": "2025 - 2026",
      "position": "Research Intern",
      "organization": "Microsoft M365 Group",
      "description": "Worked on automated troubleshooting guide generation for large-scale cloud services."
    }
  ],
  "education": [
    {
      "period": "2023 - Present",
      "degree": "PhD in Software Engineering",
      "institution": "Chongqing University",
      "description": "Focus: Log Analytics, Large Language Models"
    },
    {
      "period": "2019 - 2023",
      "degree": "Bachelor of Science in Software Engineering",
      "institution": "Chongqing University",
      "description": ""
    }
  ],
  "services": [
    {
      "category": "Conference Review & Sub-Review",
      "items": [
        "ISSRE 2025 Artifact Evaluation Committee",
        "ICSE 2026, FSE 2026, ISSTA 2026, ASE 2026 (Sub-Reviewer)"
      ]
    },
    {
      "category": "Academic Activities",
      "items": [
        "Attendee, ICSE 2025",
        "Attendee, ASE 2024",
        "Attendee, FSE 2026"
      ]
    }
  ],
  "awards": [
    {
      "year": "2024",
      "title": "National Scholarship",
      "organization": "Ministry of Education 2024"
    }
  ]
};
