
export const getSchedular = async (user_input:string) => {
    const getSchedularUrl = process.env.NEXT_PUBLIC_API_URL;

    try{const response = await fetch(`${getSchedularUrl}/api/schedular`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input }),
    });
    const schedular = await response.json();

    return schedular;

    }catch (error) {
        console.error('Error:', error);
        return null;
    }
}