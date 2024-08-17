import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ExchangeRates} from "../types/currencyTypes.ts";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import {FaExchangeAlt} from "react-icons/fa";
import Flag from 'react-world-flags';

const CurrenciesPage = () => {
    const currencies = ["UAH", "USD", "EUR", "CAD", "PLN", "GBP", "CNY", "JPY", "CZK", "ARS", "BRL", "KHR", "COP"];
    const currencyToCountry = {
        UAH: 'UA', // Ukraine Hryvnia
        USD: 'US', // United States Dollar
        EUR: 'EU', // Euro
        CAD: 'CA', // Canadian Dollar
        PLN: 'PL', // Polish Zloty
        GBP: 'GB', // British Pound
        CNY: 'CN', // Chinese Yuan
        JPY: 'JP', // Japanese Yen
        CZK: 'CZ', // Czech Koruna
        ARS: 'AR', // Argentine Peso
        BRL: 'BR', // Brazilian Real
        KHR: 'KH', // Cambodian Riel
        COP: 'CO', // Colombian Peso
    };


    const defaultCurrency = "USD";
    // @ts-ignore
    const [results, setResults] = useState<ExchangeRates>();
    const [selectedCurrency1, setSelectedCurrency1] = useState("UAH");
    const [selectedCurrency2, setSelectedCurrency2] = useState("USD");
    const [value1, setValue1] = useState<number>(1);
    const [value2, setValue2] = useState<number>(0);

    useEffect(() => {
        let stringCurrencies = "";

        for (let i = 0; i < currencies.length; i++) {
            stringCurrencies += currencies[i];
            if(i!= currencies.length-1)
                stringCurrencies += "%2C";
        }

        axios.get<ExchangeRates>(`https://api.currencyapi.com/v3/latest?apikey=cur_live_hS94HCfGq54FEafEj1TiosQSWX8ioskE4YJs0APR&currencies=${stringCurrencies}&base_currency=${defaultCurrency}`).then(res => {
            setResults(res.data);
        }).catch(console.error);
    }, []);

    const convertHandle = (currency1, currency2, count1) => {

        axios.get<ExchangeRates>(`https://api.currencyapi.com/v3/latest?apikey=cur_live_hS94HCfGq54FEafEj1TiosQSWX8ioskE4YJs0APR&currencies=${currency2}&base_currency=${currency1}`).then(res => {
            let result = res.data.data[currency2].value*count1;
            setValue2(result);
        }).catch(console.error);
    }

    const switchCurrencies = () => {
        let tmpSelected1 = selectedCurrency1;
        setSelectedCurrency1(selectedCurrency2);
        setSelectedCurrency2(tmpSelected1);

        let tmpValue1 = value1;
        setValue1(value2);
        setValue2(tmpValue1);
    }

    return (
        <div className={"flex flex-col gap-8 items-center justify-center w-full py-8 px-[35%]"}>
            <div className="w-full bg-content1 rounded p-4">
                <table className={"bg-content2 w-full"} style={{borderSpacing: "2px", borderCollapse: "separate"}}>
                    <thead>
                    <tr >
                        <th className={"bg-content1 text-2xl  text-start"}>
                            Currency
                        </th>
                        <th  className={"bg-content1 text-2xl  text-start"}>
                            Value to {defaultCurrency}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currencies.map((item) => (
                            item != defaultCurrency &&
                            <tr key={item}>
                                <td className={"bg-content1 gap-2 flex text-[20px] items-center"}>
                                    <Flag className={"w-[60px]"} height="10" code={currencyToCountry[item]}/>
                                    {item}
                                </td>
                                <td className={"bg-content1"}>{results?.data[item].value}</td>
                            </tr>
                        )

                    )
                    }
                    </tbody>
                </table>
            </div>
            <div className="bg-content1 grid grid-cols-3 gap-4 rounded p-4 w-full" style={{gridTemplateColumns: "1fr auto 1fr"}}>
                <h1 className={"font-bold text-[30px] col-start-1 col-end-4"}>Converter</h1>
                <div className={"flex flex-col gap-4"}>
                    <Select
                        onChange={(e) => {
                            setSelectedCurrency1(e.target.value)
                            convertHandle(e.target.value, selectedCurrency2, value1);
                        }}
                        defaultSelectedKeys={["UAH"]}
                        selectedKeys={[selectedCurrency1]}
                    >
                        {
                            currencies.map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))
                        }
                    </Select>
                    <Input
                        placeholder={"Value1"}
                        type={"number"}
                        variant={"faded"}
                        value={value1}
                        min={0.001}
                        onChange={(e) => setValue1(e.target.value)}
                    ></Input>
                </div>
                    <Button onPress={switchCurrencies} isIconOnly={true}>
                        <FaExchangeAlt />
                    </Button>
                <div className={"flex flex-col gap-4"}>
                    <Select
                        onChange={(e) => {
                            setSelectedCurrency2(e.target.value);
                            convertHandle(selectedCurrency1, e.target.value, value1);
                        }}
                        defaultSelectedKeys={["USD"]}
                        selectedKeys={[selectedCurrency2]}>
                        {
                            currencies.map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))
                        }
                    </Select>
                    <Input
                        isReadOnly={true}
                        placeholder={"Value2"}
                        type={"number"}
                        variant={"faded"}
                        value={value2}
                        min={0.001}
                        onChange={(e) => setValue2(e.target.value)}
                    ></Input>
                </div>
                <Button onPress={() => convertHandle(selectedCurrency1, selectedCurrency2, value1)} color={"primary"} className={"col-start-1 col-end-4"}>
                    Convert
                </Button>
            </div>
        </div>
    );
};

export default CurrenciesPage;