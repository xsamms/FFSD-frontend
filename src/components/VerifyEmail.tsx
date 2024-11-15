import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../utils/apiClient";

function VerifyEmail() {
    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5001/api/users/${param.id}/verify/${param.token}`;
				const { data } = await apiClient.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  return (
    <>
			{validUrl ? (
				<div className='relative container mx-auto flex-wrap pt-20'>
					<div>   
                        <img className="rounded-t-lg contain"
                            src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg" alt="" />
                        </div>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						Login
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
  )
}

export default VerifyEmail