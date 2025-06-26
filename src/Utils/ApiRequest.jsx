import axios from "axios"
import { BASE_URL } from "./APIEndPoints"
// import AsyncStorage from '@react-native-async-storage/async-storage';
const client = axios.create({
	baseURL: BASE_URL,
	responseType: "json",
})

const httpRequest = function (options) {
	const onSuccess = function (response) {
		return response.data
	}

	const onError = function (error) {
		console.log("fwefewwe",error)
		return Promise.reject(error.response || error.message || error.config || error.request)
	}

	return client(options).then(onSuccess).catch(onError)
}

class APIRequest {
	static async getPostService(url, inputdata, reqHeader) {
		var token = await AsyncStorage.getItem("jwttoken")
		const headercontent = token
			? { "content-type": "application/json", Authorization: "Bearer " + token }
			: { "content-type": "application/json" }
		const response = await httpRequest({
			data: inputdata,
			method: "post",
			headers: { ...headercontent, ...reqHeader },
			url: url,
			verify: "False"
		})
		return response
	}

	static async getGetService(url) {
		var token = await AsyncStorage.getItem('jwttoken');
		const headercontent = token
			? { "content-type": "application/json", Authorization: `Bearer ${token}` }
			: { "content-type": "application/json" }
		const response = await httpRequest({
			method: "GET",
			headers: headercontent,
			url: url,
		})
		return response
	}

	static async getPutService(url, inputdata, reqHeader) {
		var token = await AsyncStorage.getItem("jwttoken")
		const headercontent = token
			? { "content-type": "application/json", Authorization: "Bearer " + token }
			: { "content-type": "application/json" }
		const response = await httpRequest({
			data: inputdata,
			method: "PUT",
			headers: { ...headercontent, ...reqHeader },
			url: url,
		})
		return response
	}

	static async getGetTimebasedService(url) {
		try {
			const token = await AsyncStorage.getItem('jwttoken');
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(url, { headers });
			return response
		} catch (error) {
			// console.error('Error fetching data:', error);
		}
	}

	static async getGetRequestTimebasedService(url, RequestBody) {
		try {
			const token = await AsyncStorage.getItem('jwttoken');
			const response = await axios.post(url, RequestBody, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (error) {
			// console.error('Error fetching data:', error);
		}
	}

	static async getGetCallService(url) {
		try {
			const token = await AsyncStorage.getItem('jwttoken');
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		} catch (error) {
			// console.error('Error fetching data:', error);
		}
	}
}

export { httpRequest, APIRequest }
