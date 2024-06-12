import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/slices/commentSlice';
import Iconify from "../../component/iconify";

export function CommentForm({
    onSubmit,
    autoFocus = false,
    initialValue = "",
}) {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.comment);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    const [message, setMessage] = useState(initialValue)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(message).then(() => setMessage(""))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex justify-between">
                <div className="flex justify-between ml-auto mt-[10px] relative w-full">
                    <textarea
                        placeholder="Xin mời để lại câu hỏi, chúng tôi sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                        autoFocus={autoFocus}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="border-0 rounded-[10px] shadow-lg w-[calc(100%-80px)] min-h-[8em]"
                    />
                    <button className="bg-red-600 border-0 rounded-lg text-white gap-1 w-[70px] h-[2.5em] text-[1rem]/[1.5]" type="submit" disabled={isLoading}>
                        <div className="items-center inline-flex">
                            <Iconify icon="mingcute:send-plane-fill" width={20} />
                        </div>
                        {isLoading ? "Loading" : "Gửi"}
                    </button>
                </div>
            </div>
        </form>
    )
}
