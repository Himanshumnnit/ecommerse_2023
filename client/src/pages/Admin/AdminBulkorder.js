import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/bulk-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/bulkorder-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9" style={{ marginTop: "20px" }}>
          <h1
            className="text-center"
            style={{
              border: "1px solid #ccc",
              padding: "1px",
              borderRadius: "5px",
              width: "500px",
              textAlign: "center",
            }}
          >
            All Customized Orders
          </h1>
          {orders?.map((o, i) => (
            <div key={o._id} style={{ marginBottom: "20px" }}>
              <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <div>
                  <strong>Status:</strong>{" "}
                  <Select
                    bordered={false}
                    onChange={(value) => handleChange(o._id, value)}
                    defaultValue={o?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <strong>Name:</strong> {o?.name}
                </div>
                <div>
                  <strong>Email:</strong> {o?.email}
                </div>
                <div>
                  <strong>Contact No:</strong> {o?.contactNumber}
                </div>
                <div>
                  <strong>Address:</strong> {o?.address}
                </div>
                <div>
                  <strong>Size:</strong> {o?.size}
                </div>
                <div>
                  <strong>Quantity:</strong> {o?.quantity}
                </div>
                <div>
                  <strong>Prize:</strong> {o?.prize}
                </div>
                <div>
                  <strong>Ordered:</strong> {moment(o?.createAt).fromNow()}
                </div>
                {/* Display T-shirt Image */}
                <div
                  className=""
                  style={{
                    padding: "20px",
                    margintop: "30px",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="col-md-4" style={{ marginBottom: "10px" }}>
                    <p style={{ fontWeight: "bold" }}>Tshirt Design</p>
                    {/* Check if tshirtimage is available before displaying */}
                    {o.tshirtimage && (
                      <div>
                        <img
                          src={require(`../../../public/images/${o.tshirtimage}`)}
                          className="card-img-top"
                          alt="Tshirt Image"
                          width="80px"
                          height="130px"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4">
                    {/* Check if receipt photo is available before displaying */}
                    <p style={{ fontWeight: "bold" }}>Payment Receipt</p>
                    {o.photo && (
                      <div>
                        <img
                          src={require(`../../../public/images/${o.photo}`)}
                          className="card-img-top"
                          alt="Receipt photo"
                          width="50vh"
                          height="130px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
