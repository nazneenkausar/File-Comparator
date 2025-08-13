// missingFieldsCheck.js
// Script to analyze employees and print missing fields for each

const data = [
  {
    "name": "Engineering",
    "Employee": [
      {
        "id": "101",
        "Name": "John Doe",
        "Role": "Senior Developer",
        "Contact": {
          "Email": "john.doe@company.com",
          "Phone": "123-456-7890"
        },
        "Skills": {
          "Skill": ["JavaScript", "React", "Node.js"]
        },
        "Active": "true"
      },
      {
        "id": "102",
        "Name": "Jane Smith",
        "Role": "QA Engineer",
        "Contact": {
          "Email": "jane.smith@company.com",
          "Phone": "555-123-4567"
        },
        "Skills": {
          "Skill": ["Python", "Selenium"]
        },
        "Active": "false"
      }
    ]
  },
  {
    "name": "HR",
    "Employee": {
      "id": "201",
      "Name": "Emily Johnson",
      "Role": "HR Manager",
      "Contact": {
        "Email": "emily.johnson@company.com",
        "Phone": "222-333-4444"
      },
      "Active": "true"
    }
  }
];

// Flatten all employees into one array
const allEmployees = data.flatMap(dept => Array.isArray(dept.Employee) ? dept.Employee : [dept.Employee]);

// Collect all unique keys across all employees
const allKeys = Array.from(new Set(allEmployees.flatMap(emp => Object.keys(emp))));

// Check for missing fields for each employee
allEmployees.forEach(emp => {
  const missing = allKeys.filter(key => !(key in emp));
  console.log(`Employee id: ${emp.id}, Name: ${emp.Name}`);
  if (missing.length) {
    console.log('  Missing fields:', missing.join(', '));
  } else {
    console.log('  No missing fields.');
  }
});
