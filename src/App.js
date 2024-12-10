// import logo from "./logo.svg";
import "./App.css";

import React, { useState, useMemo } from "react";

const RentalBill = () => {
  // State variables
  const [waterBillBefore, setWaterBillBefore] = useState(0);
  const [waterBillNow, setWaterBillNow] = useState(0);
  const [electricBillBefore, setElectricBillBefore] = useState(0);
  const [electricBillNow, setElectricBillNow] = useState(0);
  const [roomBill, setRoomBill] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Computed values using useMemo for optimization
  const waterUnitUse = useMemo(() => Math.max(waterBillNow - waterBillBefore, 0), [waterBillNow, waterBillBefore]);
  const totalWaterBill = useMemo(() => waterUnitUse * 28, [waterUnitUse]);

  const electricUnitUse = useMemo(() => Math.max(electricBillNow - electricBillBefore, 0), [electricBillNow, electricBillBefore]);
  const totalElectricBill = useMemo(() => electricUnitUse * 8, [electricUnitUse]);

  const totalPriceOnTable = useMemo(() => totalWaterBill + totalElectricBill + roomBill, [
    totalWaterBill,
    totalElectricBill,
    roomBill,
  ]);

  const totalPrice = useMemo(() => Math.max(totalPriceOnTable - discount, 0), [totalPriceOnTable, discount]);

  // Date formatting
  const formattedDate = new Date().toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid">
      {/* Head */}
      <div className="row">
        <div className="col-sm-7 col-xs-12">
          <h1 className="text-info fs-2">บิลชำระค่าเช่าบ้าน</h1>
          <h5>
            <div className="text-muted fs-5">ที่อยู่: 19/8 หมู่ 3</div>
            <div className="text-muted fs-5">ตำบล ระแหง อำเภอ ลาดหลุมแก้ว จังหวัด ปทุมธานี 12140</div>
          </h5>
          <h5 className="fs-5">
            <span>วันที่</span> <span>{formattedDate}</span>
          </h5>
        </div>
        <div className="col-sm-5 col-xs-12 align-content-center">
          <h3 className="fw-bold fs-3">ที่ต้องชำระ <u>{totalPrice}</u> บาท</h3>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr className="text-center">
              <th>รายการ</th>
              <th>เลขครั้งก่อน</th>
              <th>เลขครั้งนี้</th>
              <th>จำนวนหน่วยที่ใช้</th>
              <th>ราคาต่อหน่วย</th>
              <th>ราคารวม</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td>ค่าน้ำ</td>
              <td className="text-end">
                <input
                  type="number"
                  className="input-value-form" 
                  value={waterBillBefore}
                  onChange={(e) => setWaterBillBefore(Number(e.target.value))}
                />
              </td>
              <td className="text-end">
                <input
                  type="number"
                  className="input-value-form" 
                  value={waterBillNow}
                  onChange={(e) => setWaterBillNow(Number(e.target.value))}
                />
              </td>
              <td className="text-end">{waterUnitUse}</td>
              <td className="text-end">28</td>
              <td className="text-end">{totalWaterBill}</td>
            </tr>
            <tr>
              <td>ค่าไฟ</td>
              <td className="text-end">
                <input
                  type="number"
                  className="input-value-form"
                  value={electricBillBefore}
                  onChange={(e) => setElectricBillBefore(Number(e.target.value))}
                />
              </td>
              <td className="text-end">
                <input
                  type="number"
                  className="input-value-form"
                  value={electricBillNow}
                  onChange={(e) => setElectricBillNow(Number(e.target.value))}
                />
              </td>
              <td className="text-end">{electricUnitUse}</td>
              <td className="text-end">8</td>
              <td className="text-end">{totalElectricBill}</td>
            </tr>
            <tr>
              <td>ค่าห้อง</td>
              <td className="text-end">-</td>
              <td className="text-end">-</td>
              <td className="text-end">-</td>
              <td className="text-end">-</td>
              <td className="text-end">
                <input
                  type="number"
                  className="input-value-form"
                  value={roomBill}
                  onChange={(e) => setRoomBill(Number(e.target.value))}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">หมายเหตุ</td>
              <td className="text-end">
                <h4>รวม</h4>
              </td>
              <td className="text-end">
                <div className="px-3">{totalPriceOnTable}</div>
                <div>
                  ส่วนลด
                  <input
                    type="number"
                    className="input-value-form"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Print Button */}
      <div className="text-end">
        <button
          type="button"
          className="btn btn-success no-print"
          disabled={totalPrice <= 0}
          onClick={handlePrint}
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}; 


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>

//         <div className="flex justify-center items-center h-screen bg-blue-500">
//           <h1 className="text-4xl text-white font-bold">
//             Hello, Tailwind CSS!
//           </h1>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
export default RentalBill;
