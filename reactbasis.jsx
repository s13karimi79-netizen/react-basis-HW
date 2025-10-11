import React from "react";
export default function ProductList({ products }) {
  // اگر آرایه محصولات ارسال نشود، از داده‌های پیش‌فرض استفاده می‌کنیم.
  const defaultProducts = [
    { id: 1, name: "ترافی اسپرسو", price: 129000, description: "رایحه قوی و ماندگار." },
    { id: 2, name: "ترافی لایت", price: 99000, description: "رایحه ملایم و روزمره." },
    { id: 3, name: "ترافی نایت", price: 159000, description: "رایحه گرم و خاص برای شب." },
  ];

  const list = products?.length ? products : defaultProducts;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">محصولات</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

// کامپوننت ProductCard برای نمایش جزئیات هر محصول
function ProductCard({ name, price, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
        تصویر محصول
      </div>
      <h3 className="text-lg font-medium mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">{price.toLocaleString()} تومان</span>
        <button className="bg-blue-800 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-900">
          افزودن
        </button>
      </div>
    </div>
  );
}










import React from "react";

// تمرین: نمایش لیست کاربران با props و Fragment
// هر کاربر شامل نام، سن و شهر است و از Tailwind برای استایل استفاده شده است.

export default function UserList({ users }) {
  const defaultUsers = [
    { id: 1, name: "سارا احمدی", age: 25, city: "تهران" },
    { id: 2, name: "رضا کریمی", age: 30, city: "اصفهان" },
    { id: 3, name: "مینا مرادی", age: 22, city: "تبریز" },
  ];

  const list = users?.length ? users : defaultUsers;

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">لیست کاربران</h2>
      <ul className="max-w-md mx-auto space-y-4">
        {list.map((user) => (
          <li
            key={user.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.city}</p>
            </div>
            <span className="text-gray-800 text-sm">سن: {user.age}</span>
          </li>
        ))}
      </ul>
    </>
  );
}








import React from "react";

// تمرین: نمایش لیست کاربران با props و Fragment
// هر کاربر شامل نام، سن و شهر است و از Tailwind برای استایل استفاده شده است.

export default function UserList({ users }) {
  const defaultUsers = [
    { id: 1, name: "سارا احمدی", age: 25, city: "تهران" },
    { id: 2, name: "رضا کریمی", age: 30, city: "اصفهان" },
    { id: 3, name: "مینا مرادی", age: 22, city: "تبریز" },
  ];

  const list = users?.length ? users : defaultUsers;

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">لیست کاربران</h2>
      <ul className="max-w-md mx-auto space-y-4">
        {list.map((user) => (
          <li
            key={user.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.city}</p>
            </div>
            <span className="text-gray-800 text-sm">سن: {user.age}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
