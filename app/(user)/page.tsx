'use client';
import ToggleWife from '@/components/button-primary/toggle-wife';
import Info from '@/components/button-primary/info';
import React, { useState } from 'react';

const HomePage = () => {
    const [bypassPhone, setByPassPhone] = useState(false);
    const [wife, setWife] = useState(false);
    const [error, setError] = useState('');
    const [showFormInfo, setShowFormInfo] = useState(false);

    const showFormWife = () => {
        setWife(true);
    };

    const handleSubmit = () => {
        if (!bypassPhone) {
            setError('Mật Khẩu Chưa Chính Xác. Vui Lòng Thử lại !');
        } else {
            setShowFormInfo(true);
        }
    };
    return (
        <div className="h-lvh w-full">
            {wife ? (
                <div className="relative h-full w-full">
                    {showFormInfo ? (
                        <div className="h-full w-full bg-slate-300 p-4">
                            <Info />
                        </div>
                    ) : (
                        <div className="absolute inset-0 h-full w-full bg-slate-950 p-10">
                            <div className="card-style-wife h-full w-full">
                                <div className="flex flex-1 flex-col items-center justify-center">
                                    <div className="form__group field">
                                        <input
                                            type="password"
                                            className="form__field"
                                            placeholder="Wife Password"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="form__label"
                                        >
                                            Nhập Mật Khẩu Wife :
                                        </label>
                                    </div>

                                    <span className="my-2 block text-sm text-red-400">
                                        {error}
                                    </span>

                                    <button
                                        type="button"
                                        className="btn-wife mt-2 w-full border border-gray-500"
                                        onClick={handleSubmit}
                                    >
                                        <strong>CONNECT</strong>
                                        <div id="container-stars">
                                            <div id="stars"></div>
                                        </div>

                                        <div id="glow">
                                            <div className="circle"></div>
                                            <div className="circle"></div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-[inherit] flex-col items-center justify-between py-10">
                    <div className="brutalist-card">
                        <div className="brutalist-card__header">
                            <div className="brutalist-card__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                                </svg>
                            </div>
                            <div className="brutalist-card__alert font-serif">
                                Wife Không Khả Dụng
                            </div>
                        </div>
                        <div className="brutalist-card__message capitalize">
                            Vui lòng nhập mật khẩu wife để tiếp tục =)))
                        </div>
                        <div className="brutalist-card__actions">
                            <button
                                className="brutalist-card__button brutalist-card__button--mark"
                                onClick={showFormWife}
                            >
                                Okay
                            </button>
                            <a
                                className="brutalist-card__button brutalist-card__button--read"
                                href="#"
                            >
                                Can Sồ Lu
                            </a>
                        </div>
                    </div>
                    <ToggleWife
                        bypassPhone={bypassPhone}
                        setBypassPhone={setByPassPhone}
                    />
                </div>
            )}
        </div>
    );
};

export default HomePage;
