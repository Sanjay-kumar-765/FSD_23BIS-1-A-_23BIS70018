import React from "react";
import { Student, Teacher } from "./Hierarchy";

const boxStyle = {
  border: "2px solid #4f46e5",
  borderRadius: 10,
  padding: "12px 32px",
  fontWeight: "bold",
  background: "#eef2ff",
  marginBottom: 8,
  textAlign: "center"
};

const arrowStyle = { fontSize: 32, verticalAlign: "middle", display: "block" };

function App() {
  const students = [
    new Student("Rahul", 20, "Mathematics"),
    new Student("Asha", 22, "Computer Science"),
  ];
  const teachers = [
    new Teacher("Mrs. Sharma", 40, "Physics"),
    new Teacher("Mr. Verma", 35, "English"),
  ];

  return (
    <div style={{ padding: 24, fontFamily: "Segoe UI, Arial" }}>
      <h2>Person Class Hierarchy with Flowchart and Tables</h2>
      <div style={{ textAlign: "center", margin: "32px 0" }}>
        <div style={boxStyle}>Person</div>
        <span style={arrowStyle}>&#8595;</span>
        <div style={{ display: "flex", justifyContent: "center", gap: 80 }}>
          {/* Student Branch */}
          <div>
            <div style={boxStyle}>Student</div>
            <div style={{ fontStyle: "italic", fontSize: 14, marginBottom: 12 }}>
              extends Person
            </div>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ margin: "0 auto 24px auto", minWidth: 220 }}>
              <thead>
                <tr style={{ background: "#dbeafe" }}>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stu, idx) => (
                  <tr key={idx}>
                    <td>{stu.name}</td>
                    <td>{stu.age}</td>
                    <td>{stu.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Teacher Branch */}
          <div>
            <div style={boxStyle}>Teacher</div>
            <div style={{ fontStyle: "italic", fontSize: 14, marginBottom: 12 }}>
              extends Person
            </div>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ margin: "0 auto 24px auto", minWidth: 220 }}>
              <thead>
                <tr style={{ background: "#fef08a" }}>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((tea, idx) => (
                  <tr key={idx}>
                    <td>{tea.name}</td>
                    <td>{tea.age}</td>
                    <td>{tea.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
