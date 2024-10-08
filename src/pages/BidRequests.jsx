import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const BidRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true); // New loading state

  // Queries
  const { data: bids=[], 
    refetch,
    isPending, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['bids', user?.email],
    queryFn: ()=>getBids(),
  })

  const getBids = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axiosSecure(
        `/bid-request/${user?.email}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const {mutateAsync} = useMutation({
    mutationFn:async ({id,stat})=>{
      const { data } = await axiosSecure.patch(
        `/bid/${id}`,
        { status: stat })
    },
    onSuccess:()=> {
      // refetch()
      queryClient.invalidateQueries({ queryKey: ['bids'] })
    }
  })

  const handleStatus = async (id, prevStatus, stat) => {
    console.log(id, prevStatus, stat);

    if (prevStatus === stat) {
      return console.log("No status change");
    }
    // try {
    //   const { data } = await axiosSecure.patch(
    //     `/bid/${id}`,
    //     { status: stat }
    //   );
    //   console.log("Updated bid:", data); // Debug: Check if status update reflects in data
    //   getBids(); // Re-fetch bids after updating status
    // } catch (error) {
    //   console.error("Error updating status:", error);
    // }

    await mutateAsync({id,stat})
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bids.length} Requests
        </span>
      </div>

      {/* Loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : bids.length === 0 ? (
        <p>No bid requests found</p>
      ) : (
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table
                  className="min-w-full divide-y divide-gray-200"
                  role="table"
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Email</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Deadline</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Price</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Status
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bids.map((bid) => (
                      <tr key={bid._id}>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {bid.job_title}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {bid.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {bid.deadline}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          ${bid.price}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p className={`${bid.category === "Digital Marketing" && 'text-blue-500 bg-blue-100/60'}
                            ${bid.category === "Graphics Design" && 'text-green-500 bg-green-100/60'}
                            ${bid.category === "Web Development" && 'text-yellow-500 bg-yellow-100/60'}
                             px-3 py-1 rounded-full text-xs`}>
                              {bid.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                            <h2 className="text-sm font-normal ">
                              {bid.status}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {/* In progress */}
                            <button
                              onClick={() => {
                                handleStatus(bid._id, bid.status, "In Progress");
                              }}
                              disabled={bid.status === "Complete"}
                              className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                              aria-label="Mark as complete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </button>

                            {/* rejected */}
                            <button
                              onClick={() => {
                                handleStatus(bid._id, bid.status, "Rejected");
                              }}
                              disabled={bid.status === "Complete"}
                              className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                              aria-label="Mark as pending"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BidRequests;
