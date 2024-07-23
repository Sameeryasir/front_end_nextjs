import Image from 'next/image';
import React from 'react';

export default function EmployeeList({ shop }) {
  if (!shop) {
    console.error("Shop data is not available");
    return null;
  }

  if (!shop.employees || shop.employees.length === 0) {
    console.error("No employees found in the shop data");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="font-bold text-2xl text-center mb-6">Related Employees</h2>
      <div className="flex flex-wrap -mx-4">
        {shop.employees.map((employee) => (
          <div key={employee.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="p-5 border rounded text-center text-gray-500 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
              {employee.publicURL && (
                <Image
                  className="w-32 h-32 rounded-full mx-auto"
                  src={employee.publicURL}
                  alt={employee.Name}
                  width={128}
                  height={128}
                />
              )}
              <div className="text-sm mt-5">
                <a
                  href="#"
                  className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
                >
                  {employee.Name}
                </a>
                <p>{employee.Position}</p>
              </div>
              <p className="mt-2 text-sm text-gray-900">
                {employee.Description}
              </p>
              <div className="flex mt-4 justify-center">
                <a href="#" className="w-6 mx-1">
                  <svg
                    className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
                  >
                    <path
                      id="Twitter"
                      d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
                        5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-6.465,-3.192c-0.379,0.168
                        -0.786,0.281 -1.213,0.333c0.436,-0.262 0.771,-0.676
                        0.929,-1.169c-0.408,0.242 -0.86,0.418 -1.341,0.513c-0.385,-0.411
                        -0.934,-0.667 -1.541,-0.667c-1.167,0 -2.112,0.945 -2.112,2.111c0,0.166
                        0.018,0.327 0.054,0.482c-1.754,-0.088 -3.31,-0.929
                        -4.352,-2.206c-0.181,0.311 -0.286,0.674 -0.286,1.061c0,0.733 0.373,1.379
                        0.94,1.757c-0.346,-0.01 -0.672,-0.106 -0.956,-0.264c-0.001,0.009
                        -0.001,0.018 -0.001,0.027c0,1.023 0.728,1.877 1.694,2.07c-0.177,0.049
                        -0.364,0.075 -0.556,0.075c-0.137,0 -0.269,-0.014 -0.397,-0.038c0.268,0.838
                        1.048,1.449 1.972,1.466c-0.723,0.566 -1.633,0.904 -2.622,0.904c-0.171,0
                        -0.339,-0.01 -0.504,-0.03c0.934,0.599 2.044,0.949 3.237,0.949c3.883,0
                        6.007,-3.217 6.007,-6.008c0,-0.091 -0.002,-0.183 -0.006,-0.273c0.413,-0.298
                        0.771,-0.67 1.054,-1.093Z"
                    />
                  </svg>
                </a>
                <a href="#" className="w-6 mx-1">
                  <svg
                    className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
                  >
                    <path
                      id="Facebook"
                      d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
                        5.373,-12 12,-12c6.627,0 12,5.373
                        12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422
                        0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784
                        -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
                    />
                  </svg>
                </a>
                <a href="#" className="w-6 mx-1">
                  <svg
                    className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
                  >
                    <g id="Layer_1">
                      <circle id="Oval" cx="12" cy="12" r="12"></circle>
                      <path
                        id="Shape"
                        d="M19.05,8.362c0,-0.062 0,-0.125 -0.063,-0.187l0,-0.063c-0.187,-0.562
                          -0.687,-0.937 -1.312,-0.937l0.125,0c0,0 -2.438,-0.375 -5.75,-0.375c-3.25,0
                          -5.75,0.375 -5.75,0.375l0.125,0c-0.625,0 -1.125,0.375
                          -1.313,0.937l0,0.063c0,0.062 0,0.125 -0.062,0.187c-0.063,0.625 -0.25,1.938
                          -0.25,3.438c0,1.5 0.187,2.812 0.25,3.437c0,0.063 0,0.125
                          0.062,0.188l0,0.062c0.188,0.563 0.688,0.938 1.313,0.938l-0.125,0c0,0
                          2.437,0.375 5.75,0.375c3.312,0 5.75,-0.375 5.75,-0.375l-0.125,0c0.625,0
                          1.125,-0.375 1.312,-0.938l0,-0.062c0.063,-0.063 0.063,-0.125
                          0.063,-0.188c0.062,-0.625 0.25,-1.938 0.25,-3.437c0,-1.5 -0.188,-2.813
                          -0.25,-3.438Zm-8.363,5.938l0,-4l3.625,2l-3.625,2Z"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </a>
                <a href="#" className="w-6 mx-1">
                  <svg
                    className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
                  >
                    <path
                      id="LinkedIn"
                      d="M19,0l-14,0c-2.761,0 -5,2.239 -5,5l0,14c0,2.761 2.239,5
                        5,5l14,0c2.761,0 5,-2.239 5,-5l0,-14c0,-2.761 -2.239,-5
                        -5,-5Zm-11.984,19.25l-2.016,0l0,-10.5l2.016,0l0,10.5Zm-1.008,-11.75c-0.646,0
                        -1.172,-0.525 -1.172,-1.172c0,-0.646 0.526,-1.172
                        1.172,-1.172c0.645,0 1.172,0.526 1.172,1.172c0,0.647 -0.527,1.172
                        -1.172,1.172Zm13.992,11.75l-2.016,0l0,-5.25c0,-1.311 -1.289,-2.5
                        -2.5,-2.5c-1.21,0 -2.5,1.189 -2.5,2.5l0,5.25l-2,0l0,-10.5l2,0l0,1.311c0.311,-0.647
                        1.187,-1.311 2.189,-1.311c1.002,0 1.684,0.646 2,1.311c0.311,-0.311 2,-1.311
                        2,-1.311l0,7.75Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
