import { useState } from "react";
import "./App.css";
const sampleExpenses = [
  {
    id: 1,
    name: "Lunch at Office",
    category: "Food",
    amount: 250,
    date: "12 Apr, 2015",
  },
  {
    id: 2,
    name: "Cab to Airport",
    category: "Travel",
    amount: 800,
    date: "14 Apr, 2015",
  },
  {
    id: 3,
    name: "Grocery Shopping",
    category: "Grocery",
    amount: 560,
    date: "15 Apr, 2015",
  },
  {
    id: 4,
    name: "Coffee with Friends",
    category: "Food",
    amount: 180,
    date: "18 Apr, 2015",
  },
  {
    id: 5,
    name: "Bus Pass Recharge",
    category: "Travel",
    amount: 350,
    date: "20 Apr, 2015",
  },
];
function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  function handleAddExpense(obj) {
    setExpenses((d) => [...d, obj]);
  }
  function handleClear() {
    setExpenses([]);
  }
  function deleteExpense(id) {
    setExpenses((d) => expenses.filter((d) => d.id !== id));
  }
  const expenseData = expenses.filter((d) => {
    if (filter == "All") return d;
    if (d.category == filter) return d;
  });
  const totalAmount = expenses.reduce((acc, d) => {
    if (filter == "All") return acc + d.amount;
    if (d.category == filter) return acc + d.amount;
    return acc;
  }, 0);

  return (
    <div className="app">
      <Header />
      <TotalExpense totalAmount={totalAmount} />
      <ExpenseForm handleAddExpense={handleAddExpense} />
      <Filter setFilter={setFilter} filter={filter} />
      <Expenses expenses={expenseData} deleteExpense={deleteExpense} />
      <ClearField handleClear={handleClear} />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Finance Tracker</h1>
      <h3>Track and manage your expenses </h3>
    </header>
  );
}
function TotalExpense({ totalAmount }) {
  return <div className="total">Total Expense {totalAmount}</div>;
}

function ExpenseForm({ handleAddExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, amount, category);
    if (!name || !amount || !category) return;
    const id = crypto.randomUUID();
    const obj = {
      name,
      amount,
      category,
      id,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    handleAddExpense(obj);
    setAmount("");
    setCategory("Food");
    setName("");
  }
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <label>Expense Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) =>
          e.target.value ? setAmount(+e.target.value) : setAmount("")
        }
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Grocery">Grocery</option>
        <option value="Other">Other</option>
      </select>
      <div></div>
      <button type="submit">ADD</button>
    </form>
  );
}

function Filter({ filter, setFilter }) {
  return (
    <div className="filter">
      <h1>Expenses</h1>
      <div>
        <span>Filter </span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Grocery">Grocery</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}
function Expenses({ expenses, deleteExpense }) {
  if (!expenses.length) return <p>Nothing to Show!! Add some expense</p>;
  return (
    <div className="expense-list">
      {expenses.map((d) => (
        <Card data={d} key={d.id} deleteExpense={deleteExpense} />
      ))}
    </div>
  );
}

function Card({ data, deleteExpense }) {
  let foodClass = "";
  if (data.category == "Food") foodClass = "food";
  else if (data.category == "Travel") foodClass = "travel";
  else if (data.category == "Grocery") foodClass = "grocery";
  else if (data.category == "Other") foodClass = "other";
  return (
    <div className={`expense-item ${foodClass}`}>
      <div>
        <p>{data.name}</p>
        <p>{data.date}</p>
      </div>
      <div>
        <p>
          {data.amount}
          <button className="delete-btn" onClick={() => deleteExpense(data.id)}>
            ❌
          </button>
        </p>
      </div>
    </div>
  );
}

function ClearField({ handleClear }) {
  return (
    <div className="empty">
      <button className="clear-btn" onClick={handleClear}>
        Clear All
      </button>
    </div>
  );
}
export default App;
