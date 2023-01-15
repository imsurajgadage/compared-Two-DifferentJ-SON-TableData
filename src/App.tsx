import React, { useState } from "react";
import "./App.css";
import DownArrow from "./assets/DownArrow";
import employeeData from "./Employeedata.json";
import employeeSalaryData from "./EmployyeeSalary.json";
import { calcAge } from "./Helper";

function App() {
  const [ids, setIds] = useState([]);

  const response = employeeData?.map((res) => {
    let employeeSalary = employeeSalaryData
      ?.filter((item) => item?.emp_id == res?.emp_id)
      ?.map((data) => ({
        ...data,
        totalSalary:
          Number(data?.basic_salary || 0) +
          Number(data?.bonus || 0) -
          Number(data?.professional_tax || 0) -
          Number(data?.insurance || 0),
      }));
    return {
      ...res,
      Country: !!res?.Country
        ? ![null, " "]?.includes(res?.Country)
          ? res?.Country
          : "India"
        : "India",
      age: !!res?.DOB ? calcAge(res?.DOB) : "18 Years",
      salary: employeeSalary?.reduce(
        (acc, res1) =>
          acc +
          Number(res1?.basic_salary || 0) +
          Number(res1?.bonus || 0) -
          Number(res1?.professional_tax || 0) -
          Number(res1?.insurance || 0),
        0
      ),
      salarydetails: employeeSalary,
    };
  });

  const handleClick = (id: number) => {
    if (ids?.includes(id)) {
      let response = [...ids];
      const index = response.indexOf(id);
      if (index > -1) {
        response.splice(index, 1);
      }
      setIds(response);
    } else {
      setIds([...ids, id]);
    }
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Emp_id</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Designation</th>
            <th style={{ textAlign: "right" }}>Country</th>
            <th style={{ textAlign: "right" }}>DOB</th>
            <th style={{ textAlign: "right" }}>Total Salary</th>
          </tr>
        </thead>
        <tbody>
          {response?.map((res) => (
            <React.Fragment>
              <tr>
                <td>
                  <DownArrow
                    style={{
                      transform: ids?.includes(res?.emp_id)
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => {
                      handleClick(res?.emp_id);
                    }}
                  />
                </td>
                <td>{res?.emp_id}</td>
                <td>{res?.Name}</td>
                <td style={{ textAlign: "right" }}>{res?.Designation}</td>
                <td style={{ textAlign: "right" }}>{res?.Country}</td>
                <td style={{ textAlign: "right" }}>{res?.DOB}</td>
                <td style={{ textAlign: "right" }}>{res?.salary}</td>
              </tr>
              <tr>
                <td colSpan={6}>
                  {ids?.includes(res?.emp_id) && (
                    <table>
                      <thead>
                        <tr>
                          <th>Emp_Id</th>
                          <th>salary_Id</th>
                          <th style={{ textAlign: "right" }}>Basic salary</th>
                          <th style={{ textAlign: "right" }}>Bonus</th>
                          <th style={{ textAlign: "right" }}>Insurance</th>
                          <th style={{ textAlign: "right" }}>
                            Professional Tax
                          </th>
                          <th style={{ textAlign: "right" }}>
                            Total monthly salary
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {res?.salarydetails?.map((item) => (
                          <tr>
                            <td>{item?.emp_id}</td>
                            <td>{item?.salary_id}</td>
                            <td style={{ textAlign: "right" }}>
                              {item?.basic_salary || 0}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {item?.bonus || 0}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {item?.insurance || 0}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {item?.professional_tax || 0}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {item?.totalSalary}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
