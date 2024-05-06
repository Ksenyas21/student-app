"use client"
import {useTranslations} from "use-intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/lib/store";
import {decrement, increment, incrementByAmount} from "@/app/lib/features/counter/counterSlice";

const MainPage = () => {
    const t = useTranslations()
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{t('label')}</h1>
            <main>
                <button
                    onClick={() => dispatch(increment())}
                >Increment
                </button>
                <span>{count}</span>
                <button
                    onClick={() => dispatch(decrement())}
                >Decrement
                </button>
                <button
                    onClick={() => dispatch(incrementByAmount(2))}
                >Increment by 2
                </button>
            </main>
        </div>
    );
}
export default MainPage;
