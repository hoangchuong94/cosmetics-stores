'use client';
import React from 'react';

interface ToggleBtnAteProps {
    bypassPhone: boolean;
    setBypassPhone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleBtnAte = ({ bypassPhone, setBypassPhone }: ToggleBtnAteProps) => {
    return (
        <>
            <div className="fx-block">
                <div className="toggle">
                    <div>
                        <input
                            type="checkbox"
                            id="toggles"
                            onChange={() => setBypassPhone(!bypassPhone)}
                        />
                        <div data-unchecked="On" data-checked="Off"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToggleBtnAte;
