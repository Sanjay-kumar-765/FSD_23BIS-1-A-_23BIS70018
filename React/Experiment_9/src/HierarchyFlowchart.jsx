import React from "react";

const boxStyle = {
  display: "inline-block",
  border: "2px solid #4f46e5",
  borderRadius: 10,
  padding: "12px 32px",
  margin: "10px 10px",
  fontWeight: "bold",
  background: "#eef2ff"
};
const arrowStyle = { fontSize: 32, verticalAlign: "middle", margin: "0 10px" };

function HierarchyFlowchart() {
  return (
    <div style={{ textAlign: "center", margin: "32px 0" }}>
      <div style={boxStyle}>Person</div>
      <div>
        <span style={arrowStyle}>&#8595;</span>
      </div>
      <div>
        <div style={{ display: "inline-block", marginRight: 40 }}>
          <div style={boxStyle}>Student</div>
          <div style={{ fontStyle: "italic", fontSize: 14 }}>extends Person</div>
        </div>
        <div style={{ display: "inline-block", marginLeft: 40 }}>
          <div style={boxStyle}>Teacher</div>
          <div style={{ fontStyle: "italic", fontSize: 14 }}>extends Person</div>
        </div>
      </div>
    </div>
  );
}

export default HierarchyFlowchart;
