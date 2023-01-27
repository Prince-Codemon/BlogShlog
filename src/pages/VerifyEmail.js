import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../store/services/userService";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [verifyEmail, result] = useVerifyEmailMutation();
  const { data, error } = result;


  useEffect(() => {
    verifyEmail(id);
  }, [id, verifyEmail]);
  useEffect(() => {
    if (data) {
      toast.success(data.msg);
      navigate("/auth/login");
    }
    if (error) {
      toast.error(error.data.msg);
      navigate("/auth/login");
    }
  }, [data, error,navigate]);
  if (result.isLoading) {
    return <Spinner />;
  }

  return <div>
    <RHelmet title="Verify Email" />
    VerifyEmail</div>;
};

export default VerifyEmail;
