import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { Chart } from '@common/Chart';
import Image from 'next/image';
import Link from 'next/link';

const PRODUCT_LIMIT = 5;
const PRODUCT_OFFSET = 5;

export default function Dashboard() {
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET));

  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

  const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#a3ba21', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image/NAME
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Editar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      BORRAr
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product?.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <img
                              className="h-10 w-10 rounded-full"
                              src={product.images[0]}
                              width={100}
                              height={100}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product?.title}</div>
                            <div className="text-sm text-gray-500">{product?.category?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product?.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{product.category.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.id}</td>
                      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Link href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Link href="#" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
