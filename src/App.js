import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChildDashboard from './components/ChildDashboard';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Transfers from './components/Transfers';
import Home from './pages/Home';
import PrivateComp from './components/PrivateComp';
import Credits from './components/Credits';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateComp />}>
          <Route path="/dashboard" element={<ChildDashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/expenselist" element={<ExpenseList />} />
          <Route path="addtrans" element={<Credits />} />
          <Route path="/transfer" element={<Transfers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
