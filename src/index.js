/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
  
	  const data = await request.json();
  
	  const messages = [
		{"role": "system", "content": "You are Ricky's helpful ChatGPT assistant"},
		{"role": "user", "content": data.question}
	  ]
	  var raw = JSON.stringify({
		"model": "gpt-3.5-turbo",
		"messages": messages,
	  });
  
	  const openai_api_key = "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";
  
	  const requestOptions = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + openai_api_key,
		},
		body: raw,
		redirect: 'follow'
	  };
  
	  let result = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
	  result = await result.json();
  
	  console.log(result.error)
	  return new Response(result.choices[0].message.content);
	}
  };