import { useState } from "react";

type Product = {
  amount: string;
  price: string;
};

const emptyRow = (): Product => ({
  amount: "",
  price: "",
});

function App() {
  const [products, setProducts] = useState<Product[]>([
    emptyRow(),
    emptyRow(),
  ]);

  const update = (
    index: number,
    key: keyof Product,
    value: string
  ) => {
    const next = [...products];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    if (
      index === products.length - 1 &&
      (next[index].amount ||
        next[index].price)
    ) {
      next.push(emptyRow());
    }

    setProducts(next);
  };


  const clear = () => {
    setProducts([
      emptyRow(),
      emptyRow(),
    ]);
  };


  const unitPrices = products.map((p) => {
    const amount = Number(p.amount);
    const price = Number(p.price);

    if (!amount || !price) {
      return null;
    }

    return price / amount;
  });


  const valid = unitPrices.filter(
    (v): v is number => v !== null
  );

  const min =
    valid.length
      ? Math.min(...valid)
      : null;


  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="mx-auto max-w-xl">

        <h1 className="mb-4 text-xl font-bold">
          お買い得比較
        </h1>


        <table className="w-full bg-white border">

          <thead>
            <tr>
              <th className="border p-2">
                容量(g)
              </th>
              <th className="border p-2">
                価格(円)
              </th>
              <th className="border p-2">
                円/g
              </th>
              <th className="border p-2">
                最安
              </th>
            </tr>
          </thead>


          <tbody>

            {products.map((p, i) => {

              const price =
                unitPrices[i];

              const best =
                price !== null &&
                min !== null &&
                price === min;


              return (
                <tr key={i}>

                  <td className="border p-1">

                    <input
                      className="w-full border p-1 text-right"
                      inputMode="numeric"
                      value={p.amount}
                      onChange={(e) =>
                        update(
                          i,
                          "amount",
                          e.target.value
                        )
                      }
                    />

                  </td>


                  <td className="border p-1">

                    <input
                      className="w-full border p-1 text-right"
                      inputMode="numeric"
                      value={p.price}
                      onChange={(e) =>
                        update(
                          i,
                          "price",
                          e.target.value
                        )
                      }
                    />

                  </td>


                  <td className="border p-2 text-right">

                    {
                      price !== null
                        ? price.toFixed(3)
                        : "-"
                    }

                  </td>


                  <td className="border p-2 text-center">

                    {best ? "★" : ""}

                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>


        <button
          onClick={clear}
          className="mt-4 w-full rounded bg-gray-800 p-2 text-white"
        >
          すべてクリア
        </button>


      </div>

    </div>
  );
}

export default App;