import React, { useEffect, useState } from 'react';

interface InputJson {
  inputs: string;
}


async function queryForImage(data) {

	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
			headers: { Authorization: "XXXX" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}


const textToJson = (text: string): InputJson => {
  return { inputs: text };
};


export async function query(data: { inputs: string; }) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
		{
			headers: { Authorization: "XXXX", 'Content-Type' : 'application/json' },
						method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

const ModernTextInput: React.FC<{
  value: string;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        minHeight: '150px',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        outline: 'none',
      }}
      placeholder="Enter your text here..."
    />
  );
};

  const ModernSubmitButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      Generate Image
    </button>
  );
};

export type VibeType = "Professional" | "Casual" | "Funny";


const ModernPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<any>('');
  const [imgOut, setImgOut] = useState<Blob>();

  const [text, setText] = useState<any>('');
  const [imgIn, setimgIn] = useState<Blob>();

  const [vibe, setVibe] = useState<VibeType>('Funny');

  const handleTextChange = (newValue: string) => {
    setInputText(newValue);
  };

  const handleSubmit = async () => {
    console.log('Submitted text:', inputText);
    try {

        const prompt = `Generate 2 ${vibe} Tinder biographies with no hashtags and clearly labeled "1." and "2.". ${
            vibe === 'Funny'
              ? "Make sure there is a joke in there and it's a little ridiculous."
              : null
          }
            Make sure each generated biography is less than 160 characters, and base them on this context: ${inputText}
          }`

      console.log(prompt);
      const response = await query(textToJson(prompt));
      const imgResponse = await queryForImage(inputText);
      setImgOut(imgResponse);
      setOutput(JSON.stringify(response));
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('Output changed:', output);
    setimgIn(imgOut)
    setText(output);
  }, [output,imgOut]);




  return (
    <>
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Describe the photo you want to generate</h1>
      <ModernTextInput value={inputText} onChange={handleTextChange} />
      <ModernSubmitButton onClick={handleSubmit} />
    </div>
    <div>
    <div>
        {imgOut ? (
          <img className='overlay' src={URL.createObjectURL(imgOut)} alt="Generated Image" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </div>
    </>
    
  );
};

export default ModernPage;
      