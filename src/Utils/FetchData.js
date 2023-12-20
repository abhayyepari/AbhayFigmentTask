export const yahooOptions = {
    method : 'GET',
    headers: {
        'X-RapidAPI-Key': '464f568192mshcb5ef4579db28ccp1e9ca1jsnf8e5d239197e',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      },
};

export const fetchData = async (url,options) => {
    const res = await fetch(url,options);
    const data = await res.json();

    return data;
};