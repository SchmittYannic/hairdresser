import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState, MouseEvent, KeyboardEvent } from "react"
import FocusTrap from "focus-trap-react"
import { MdClose } from "react-icons/md";
import "./Dialog.scss"

const Dialog = ({
    children,
    setDialog,
    className = "",
    ...rest
}: PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, "className"> & { className?: string, setDialog: Function }>) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const [top, setTop] = useState("");

    const handleCloseClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setDialog(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setDialog(false);
        }
    }

    useEffect(() => {
        if (ref.current) {
            setTop((window.innerHeight * .5).toString() + "px");
            ref.current.scrollIntoView({
                block: "center",
            });
        }
    }, []);

    return (
        <FocusTrap>
            <div
                className={`dialog__background ${className}`}
                onKeyDown={handleKeyDown}
                {...rest}
            >
                <div
                    id="dialog"
                    className="dialog"
                    tabIndex={0}
                    ref={ref}
                    style={{ top: top }}
                >
                    <button
                        className="dialog__close"
                        type="button"
                        onClick={handleCloseClicked}
                        onKeyDown={(e) => e.key === "Enter" ? setDialog(false) : null}
                    >
                        <span className="icon-container">
                            <MdClose aria-hidden />
                        </span>
                    </button>

                    {children}

                </div>
            </div>
        </FocusTrap>
    )

    // return ReactDOM.createPortal(
    //     <FocusTrap>
    //         <div
    //             className={`dialog__background ${className}`}
    //             onKeyDown={handleKeyDown}
    //             {...rest}
    //         >
    //             <div
    //                 id="dialog"
    //                 className="dialog"
    //                 tabIndex={0}
    //                 ref={ref}
    //                 style={{ top: top }}
    //             >
    //                 <button
    //                     className="dialog__close"
    //                     type="button"
    //                     onClick={handleCloseClicked}
    //                     onKeyDown={(e) => e.key === "Enter" ? setDialog(false) : null}
    //                 >
    //                     <span className="icon-container">
    //                         <MdClose aria-hidden />
    //                     </span>
    //                 </button>

    //                 {children}

    //             </div>
    //         </div>
    //     </FocusTrap>,
    //     document.body
    // )
}

export default Dialog