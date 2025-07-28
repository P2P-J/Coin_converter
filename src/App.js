import React, { useState, useEffect } from "react";
import "./App.css"; // App.css 파일 불러오기

function App() {
  // 로딩 상태 관리 (true = 로딩 중)
  const [loading, setLoading] = useState(true);

  // 코인 데이터(배열 형태) 저장
  const [coins, setCoins] = useState([]);

  // 사용자 입력 USD 금액
  const [usd, setUsd] = useState(0);

  // 선택한 코인 정보 (가격과 심볼)
  const [selectedCoin, setSelectedCoin] = useState({ price: 0, symbol: "" });

  // USD 입력창이 바뀔 때마다 실행
  const onChangeUSD = (event) => setUsd(event.target.value);

  // 코인을 선택했을 때 실행 (select 변경 시)
  const onChangeCoin = (event) => {
    // 선택한 option의 value(가격)와 일치하는 코인을 찾는다
    const selected = coins.find(
      (coin) => coin.quotes.USD.price === Number(event.target.value)
    );
    // 선택한 코인의 가격과 심볼을 상태로 저장
    setSelectedCoin({
      price: selected.quotes.USD.price,
      symbol: selected.symbol,
    });
  };

  // 컴포넌트가 처음 화면에 나타날 때(API 요청)
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json()) // 응답을 JSON으로 변환
      .then((json) => {
        setCoins(json); // coins 상태를 API 데이터로 설정
        setLoading(false); // 로딩 끝
      });
  }, []); // [] = 처음 렌더링할 때만 실행

  return (
    <div className="container">
      {/* 아이콘 */}
      <div className="icon">💰</div>

      {/* 코인 개수 표시 (로딩 끝나면 coins.length 표시) */}
      <h1 className="title">Which coin do you want to buy?</h1>

      {/* 로딩 중이면 'Loading...' 표시 */}
      {loading ? <strong className="loading">Loading...</strong> : null}

      {/* 코인 선택 드롭다운 */}
      <select
        className="dropdown"
        value={selectedCoin.price}
        onChange={onChangeCoin}
      >
        <option value={0}>Select a coin</option>
        {coins.map((coin) => (
          // coins 배열을 돌면서 <option> 생성
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol})
          </option>
        ))}
      </select>

      {/* USD 입력 영역 */}
      <div className="inputBox">
        <input
          className="usdInput"
          value={usd} // 입력값을 상태(usd)와 동기화
          type="number"
          onChange={onChangeUSD} // 입력할 때마다 usd 상태 업데이트
          placeholder="Type your USD here !"
        />
        <span className="label">USD</span>
      </div>

      {/* 환산 결과 표시 */}
      <div className="inputBox">
        <div className="result">
          {/* 코인을 선택했다면 (price > 0) USD / 가격 계산 */}
          {selectedCoin.price > 0
            ? (usd / selectedCoin.price).toFixed(3)
            : "0.000"}
        </div>
        <span className="label">{selectedCoin.symbol || "COIN"}</span>
      </div>
    </div>
  );
}

export default App;
// App 컴포넌트를 외부에서 사용할 수 있게 export

// import React, { useState, useEffect } from "react";
// // React 라이브러리와 Hook(useState, useEffect)을 불러옴
// // useState: 상태 관리용
// // useEffect: 렌더링 후 특정 작업(사이드 이펙트) 실행

// function App() {
//   // 로딩 상태 관리 (true = 로딩 중)
//   const [loading, setLoading] = useState(true);

//   // 코인 데이터(배열 형태) 저장
//   const [coins, setCoins] = useState([]);

//   // 사용자 입력 USD 금액
//   const [usd, setUsd] = useState(0);

//   // 선택한 코인 정보 (가격과 심볼)
//   const [selectedCoin, setSelectedCoin] = useState({ price: 0, symbol: "" });

//   // USD 입력창이 바뀔 때마다 실행
//   const onChangeUSD = (event) => setUsd(event.target.value);

//   // 코인을 선택했을 때 실행 (select 변경 시)
//   const onChangeCoin = (event) => {
//     // 선택한 option의 value(가격)와 일치하는 코인을 찾는다
//     const selected = coins.find(
//       (coin) => coin.quotes.USD.price === Number(event.target.value)
//     );
//     // 선택한 코인의 가격과 심볼을 상태로 저장
//     setSelectedCoin({
//       price: selected.quotes.USD.price,
//       symbol: selected.symbol,
//     });
//   };

//   // 컴포넌트가 처음 화면에 나타날 때(API 요청)
//   useEffect(() => {
//     fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
//       .then((response) => response.json()) // 응답을 JSON으로 변환
//       .then((json) => {
//         setCoins(json); // coins 상태를 API 데이터로 설정
//         setLoading(false); // 로딩 끝
//       });
//   }, []); // [] = 처음 렌더링할 때만 실행

//   return (
//     <div>
//       {/* 코인 개수 표시 (로딩 끝나면 coins.length 표시) */}
//       <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

//       {/* 로딩 중이면 'Loading...' 표시 */}
//       {loading ? <strong>Loading...</strong> : null}

//       {/* 코인 선택 드롭다운 */}
//       <select value={selectedCoin.price} onChange={onChangeCoin}>
//         <option value={0}>Select a coin</option>
//         {coins.map((coin) => (
//           // coins 배열을 돌면서 <option> 생성
//           <option key={coin.id} value={coin.quotes.USD.price}>
//             {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
//           </option>
//         ))}
//       </select>

//       {/* USD 입력 영역 */}
//       <div className="usdclass">
//         My USD :
//         <input
//           value={usd} // 입력값을 상태(usd)와 동기화
//           type="number"
//           onChange={onChangeUSD} // 입력할 때마다 usd 상태 업데이트
//           placeholder="Type your USD here!"
//         />
//       </div>

//       {/* 환산 결과 표시 */}
//       <div className="coinbox">
//         You can buy: {/* 코인을 선택했다면 (price > 0) USD / 가격 계산 */}
//         {selectedCoin.price > 0
//           ? `${(usd / selectedCoin.price).toFixed(3)} ${selectedCoin.symbol}`
//           : "0"}
//       </div>
//     </div>
//   );
// }

// export default App;
// // App 컴포넌트를 외부에서 사용할 수 있게 export
