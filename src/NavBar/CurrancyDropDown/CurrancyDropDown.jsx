import React, { useState } from "react";
import styles from "./CurrencyDropdown.module.css";

const CurrencyDropdown = ({ setData }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState({ symbol: "$", code: "USD" });
	const currencies = [
		{ symbol: "$", code: "USD", currency: 3 },
		{ symbol: "€", code: "EUR", currency: 1 },
		{ symbol: "¥", code: "JPY", currency: 145 },
	];
	const handleSelect = (currency) => {
		console.log(currency);
		setSelected(currency);
		setIsOpen(false);

		setData((prevProducts) => {
			// Define conversion rates (adjust these values as needed)
			const rates = {
				USD: 1, // Base currency
				// + changed currency conversion rates
				EUR: 1.2, // 1 USD = 0.85 EUR
				JPY: 145, // 1 USD = 110 JPY
			};

			return prevProducts.map((product) => ({
				...product,
				price: product.originalPrice * rates[currency.code],
				currency: currency.code
			}));
		});
	};

	return (
		<div className={styles.dropdown}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={styles.dropdownButton}
			>
				<span className={styles.symbol}>{selected.symbol}</span>
				<span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
					▼
				</span>
			</button>

			{isOpen && (
				<>
					<div
						className={styles.backdrop}
						onClick={() => setIsOpen(false)}
					></div>

					<div className={styles.menu}>
						{currencies.map((currency) => (
							<button
								key={currency.code}
								onClick={() => handleSelect(currency)}
								className={`${styles.option} ${
									selected.code === currency.code ? styles.selected : ""
								}`}
							>
								<span className={styles.symbol}>{currency.symbol}</span>
								<span className={styles.code}>{currency.code}</span>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CurrencyDropdown;
