"use client";

import { useState } from "react";
import { Market } from "@/core/entities/Market";
import ConfirmationModal from "./ConfirmationModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./DailyTransactionForm.module.css";

interface DailyTransactionFormProps {
  markets: Market[];
}

interface MarketTransaction {
  marketId: number;
  income: string;
  rentPrice: string;
  expense: { name: string; amount: string }[];
}

export default function DailyTransactionForm({
  markets,
}: DailyTransactionFormProps) {
  const [transactions, setTransactions] = useState<MarketTransaction[]>(
    markets.map((market) => ({
      marketId: market.id,
      income: "",
      rentPrice: "",
      expense: [{ name: "", amount: "" }],
    }))
  );
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleRentPriceChange = (index: number, value: string) => {
    const newTransactions = [...transactions];
    newTransactions[index].rentPrice = value;
    setTransactions(newTransactions);
  };

  const handleIncomeChange = (index: number, value: string) => {
    const newTransactions = [...transactions];
    newTransactions[index].income = value;
    setTransactions(newTransactions);
  };

  const handleExpenseChange = (
    transactionIndex: number,
    expenseIndex: number,
    field: "name" | "amount",
    value: string
  ) => {
    const newTransactions = [...transactions];
    newTransactions[transactionIndex].expense[expenseIndex][field] = value;
    setTransactions(newTransactions);
  };

  const addExpense = (index: number) => {
    const newTransactions = [...transactions];
    newTransactions[index].expense.push({ name: "", amount: "" });
    setTransactions(newTransactions);
  };

  const removeExpense = (transactionIndex: number, expenseIndex: number) => {
    const newTransactions = [...transactions];
    newTransactions[transactionIndex].expense.splice(expenseIndex, 1);
    setTransactions(newTransactions);
  };

  const requestRemoveMarketForm = (index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const removeMarketForm = () => {
    if (deleteIndex !== null) {
      const newTransactions = [...transactions];
      newTransactions.splice(deleteIndex, 1);
      setTransactions(newTransactions);
      setDeleteIndex(null);
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    setShowModal(false);
  
    try {
      const requestBody = {
        date: selectedDate,
        transactions: transactions
      };
  
      const response = await fetch("/api/daily-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error("Failed to submit daily transaction");
  
      // Reset form after successful submission
      setTransactions(
        markets.map((market) => ({
          marketId: market.id,
          income: "",
          rentPrice: "",
          expense: [{ name: "", amount: "" }],
        }))
      );
    } catch (error) {
      console.error("Error submitting daily transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.datePickerContainer}>
        <label htmlFor="transactionDate">วันที่ทำรายการ:</label>
        <input
          type="date"
          id="transactionDate"
          value={selectedDate}
          onChange={handleDateChange}
          max={getCurrentDate()}
          required
          className={styles.datePicker}
        />
      </div>
      <div className={styles.form}>
        {transactions.map((transaction, index) => (
          <div key={transaction.marketId} className={styles.marketForm}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => requestRemoveMarketForm(index)}
            >
              &times;
            </button>
            <h3>{markets.find((m) => m.id === transaction.marketId)?.name}</h3>
            <input
              type="number"
              value={transaction.income}
              onChange={(e) => handleIncomeChange(index, e.target.value)}
              placeholder="รายรับ (บาท)"
              required
              className={styles.input}
            />
            <input
              type="number"
              value={transaction.rentPrice}
              onChange={(e) => handleRentPriceChange(index, e.target.value)}
              placeholder="ค่าเช่า (บาท)"
              required
              className={styles.input}
            />
            {transaction.expense.map((expense, expenseIndex) => (
              <div key={expenseIndex} className={styles.expenseForm}>
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) =>
                    handleExpenseChange(
                      index,
                      expenseIndex,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="รายจ่าย เช่น ค่าน้ำแข็ง"
                  className={styles.input}
                />
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    handleExpenseChange(
                      index,
                      expenseIndex,
                      "amount",
                      e.target.value
                    )
                  }
                  placeholder="จำนวนเงิน (บาท)"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => removeExpense(index, expenseIndex)}
                  className={styles.removeButton}
                >
                  ลบรายจ่าย
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addExpense(index)}
              className={styles.addButton}
            >
              เพิ่มรายจ่าย
            </button>
          </div>
        ))}
      </div>
      <button type="submit" className={styles.submitButton}>
        ยืนยันรายจ่ายประจำวัน
      </button>
      {showModal && (
        <ConfirmationModal
          onConfirm={confirmSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={removeMarketForm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </form>
  );
}