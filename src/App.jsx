import "./App.css";
import { useState, useEffect } from "react";
import { data } from "./customers";

function App() {
  const [users, setUsers] = useState(data);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("");

  useEffect(() => {
    filterData();
  }, [search]);

  const filterData = () => {
    const filteredData = data.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
    setUsers(filteredData);
  };

  const sorting = (col) => {
    const sortOrder = order === "ASC" ? "DSC" : "ASC";
    const sorted = [...users].sort((a, b) => {
      if (typeof a[col] === "string") {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      } else {
        return a[col] > b[col] ? 1 : -1;
      }
    });
    if (order === "DSC") sorted.reverse();
    setUsers(sorted);
    setOrder(sortOrder);
    setColumn(col);
  };

  const getArrow = (col) => {
    if (column === col) {
      return order === "ASC" ? " ▲" : " ▼";
    }
    return "";
  };

  const renderUsers = () => {
    return users.map((user, index) => (
      <tr key={index}>
        <td>{user.customer}</td>
        <td>{user.last_seen}</td>
        <td>{user.orders}</td>
        <td>{user.total_spent}</td>
        <td>{user.latest_purchase}</td>
        <td>{user.news ? "Yes" : "No"}</td>
        <td>{user.segments.join(", ")}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <h2>Search </h2>
      <input
        type="text"
        placeholder="Search Here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sorting("customer")}>
                Customer{getArrow("customer")}
              </th>
              <th onClick={() => sorting("last_seen")}>
                Last Seen{getArrow("last_seen")}
              </th>
              <th onClick={() => sorting("orders")}>
                Orders{getArrow("orders")}
              </th>
              <th onClick={() => sorting("total_spent")}>
                Total Spent{getArrow("total_spent")}
              </th>
              <th onClick={() => sorting("latest_purchase")}>
                Latest Purchase{getArrow("latest_purchase")}
              </th>
              <th onClick={() => sorting("news")}>News{getArrow("news")}</th>
              <th>Segments</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
