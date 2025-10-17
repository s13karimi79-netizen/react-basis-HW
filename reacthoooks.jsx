//CRUD
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]); // لیست کاربران
  const [name, setName] = useState("");   // ورودی نام
  const [email, setEmail] = useState(""); // ورودی ایمیل

  // دریافت کاربران از API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // افزودن کاربر جدید
  const addUser = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("لطفاً نام و ایمیل را وارد کنید!");
      return;
    }

    const newUser = {
      id: Date.now(), // شناسه‌ی موقت
      name,
      email,
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  // حذف کاربر
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">لیست کاربران</h2>

      {/* فرم افزودن کاربر */}
      <form
        onSubmit={addUser}
        className="flex flex-col sm:flex-row gap-3 mb-6 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          افزودن
        </button>
      </form>

      {/* نمایش لیست کاربران */}
      <ul className="w-full max-w-md bg-white rounded-xl shadow p-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border-b border-gray-100 py-2"
          >
            <div>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600 transition"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






//گالری تصاویر ساده با API
import React, { useEffect, useState } from "react";

export default function App() {
  const [photos, setPhotos] = useState([]);        // ذخیره تصاویر
  const [page, setPage] = useState(1);            // شماره صفحه
  const [loading, setLoading] = useState(false);  // وضعیت بارگذاری


  const ACCESS_KEY = "M3GLlGsv7SSal3YJiS0B76oq-giI2qiNVlYJfedqLt0";

  // دریافت تصاویر از Unsplash
  const fetchPhotos = async () => {
    if (!ACCESS_KEY) {
      console.warn("Access Key وارد نشده است!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setPhotos((prev) => [...prev, ...data]);
      } else {
        console.error("پاسخ غیرمنتظره از API:", data);
      }
    } catch (err) {
      console.error("خطا در دریافت تصاویر:", err);
    } finally {
      setLoading(false);
    }
  };

  // اجرای اولیه و هر بار تغییر صفحه
  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#2563eb", marginBottom: "1.5rem" }}>
        🖼️ گالری تصاویر
      </h1>

      {/* گرید تصاویر */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {photos.map((p) => (
          <div key={p.id} style={{
            borderRadius: 10,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <img
              src={p.urls.small}
              alt={p.alt_description || "photo"}
              style={{ width: "100%", height: 220, objectFit: "cover", transition: "transform 0.3s" }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            />
            <div style={{ padding: "8px", fontSize: 13, color: "#374151" }}>
              {p.user?.name || "Unsplash"}
            </div>
          </div>
        ))}
      </div>

      {/* دکمه بارگذاری بیشتر */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={loading}
          style={{
            padding: "10px 18px",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            background: loading ? "#9ca3af" : "#2563eb",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
        </button>
      </div>
    </div>
  );
}
