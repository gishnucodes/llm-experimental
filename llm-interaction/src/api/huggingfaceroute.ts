

export  function query2(data: { inputs: string; }) {
	const response =  fetch(
		"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
		{
			headers: { Authorization: "Bearer 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", 'Content-Type' : 'application/json' },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result =  response;
	return result;
}



