import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

// jan 9
function App() {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="basis-[100%]">
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;

// deleted table code

{
  /* Second Column */
}
{
  /* <div className="grid grid-cols-2 gap-4 "> */
}
{
  /* First Column */
}
{
  /* <div className="col-span-1 overflow-x-auto bg-dark_color w-full  max-h-screen overflow-y-auto rounded-lg">
            <table className="border-collapse table_border table-auto w-full">
              <thead>
                <tr>
                  <th className="w-3">R.N</th>
                  <th>Sensor1</th>
                  <th>Sensor2</th>
                  <th>Sensor3</th>
                  <th>Sensor4</th>
                  <th>Sensor5</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    rn: 1,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 2,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 3,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 4,
                    sensor1: onedata.sensor1,
                    sensor2: onedata.sensor2,
                    sensor3: onedata.sensor3,
                    sensor4: onedata.sensor4,
                    sensor5: onedata.sensor5,
                  },
                  {
                    rn: 5,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 6,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 7,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 8,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 9,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 10,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 11,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 12,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 13,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 14,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 15,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 16,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 17,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 18,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 19,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 20,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 21,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 22,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 23,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 24,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 25,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 26,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 27,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 28,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 29,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 30,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                ].map((row, index) => (
                  <tr key={index}>
                    <td>{row.rn}</td>
                    <td
                      className={`${
                        index === 3
                          ? parseInt(onedata.sensor1) >=
                            parseInt(color_Limit.inputValue)
                            ? "bg-red-700"
                            : ""
                          : ""
                      }`}
                    >
                      {row.sensor1}
                    </td>
                    <td
                      className={`${
                        index === 3
                          ? parseInt(onedata.sensor2) >=
                            parseInt(color_Limit.inputValue)
                            ? "bg-red-700"
                            : ""
                          : ""
                      }`}
                    >
                      {row.sensor2}
                    </td>
                    <td
                      className={`${
                        index === 3
                          ? parseInt(onedata.sensor3) >=
                            parseInt(color_Limit.inputValue)
                            ? "bg-red-700"
                            : ""
                          : ""
                      }`}
                    >
                      {row.sensor3}
                    </td>
                    <td
                      className={`${
                        index === 3
                          ? parseInt(onedata.sensor4) >=
                            parseInt(color_Limit.inputValue)
                            ? "bg-red-700"
                            : ""
                          : ""
                      }`}
                    >
                      {row.sensor4}
                    </td>
                    <td
                      className={`${
                        index === 3
                          ? parseInt(onedata.sensor5) >=
                            parseInt(color_Limit.inputValue)
                            ? "bg-red-700"
                            : ""
                          : ""
                      }`}
                    >
                      {row.sensor5}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */
}

{
  /* Second Column */
}
{
  /* <div className="col-span-1 overflow-x-auto bg-dark_color w-full  max-h-screen overflow-y-auto rounded-lg"> */
}
{
  /* Your 31x6 table content for the second column */
}
{
  /* <table className="border-collapse table2_border  table-auto w-full">
              <thead>
                <tr>
                  <th className="w-3">R.N</th>
                  <th>Sensor1</th>
                  <th>Sensor2</th>
                  <th>Sensor3</th>
                  <th>Sensor4</th>
                  <th>Sensor5</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    rn: 31,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 32,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 33,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 34,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 35,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 36,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 37,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 38,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 39,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 40,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 41,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 42,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 43,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 44,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 45,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 46,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 47,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 48,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 49,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 50,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 51,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 52,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 53,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 54,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 55,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 56,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 57,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 58,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 59,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                  {
                    rn: 60,
                    sensor1: "-",
                    sensor2: "-",
                    sensor3: "-",
                    sensor4: "-",
                    sensor5: "-",
                  },
                ].map((row, index) => (
                  <tr key={index}>
                    <td>{row.rn}</td>
                    <td>{row.sensor1}</td>
                    <td>{row.sensor2}</td>
                    <td>{row.sensor3}</td>
                    <td>{row.sensor4}</td>
                    <td>{row.sensor5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */
}
