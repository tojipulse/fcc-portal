"use client";

import { useState } from "react";

type RegistrationMessageProps = {
  guardianName: string;
  loginId: string;
  password: string;
};

const portalBaseUrl = "https://fcc-portal.com";

export default function RegistrationMessage({
  guardianName,
  loginId,
  password,
}: RegistrationMessageProps) {
  const [copied, setCopied] = useState(false);

  const loginUrl = `${portalBaseUrl}/login?id=${encodeURIComponent(loginId)}`;

  const message = `${guardianName}様

この度はFCチャレンジャーズへご入会いただきありがとうございます。

FCC PORTALへの登録が完了しました。

【ログインURL】
${loginUrl}

【初期パスワード】
${password}

ログインIDはURLに設定済みですので、
初期パスワードを入力してログインしてください。

初回ログイン後は、パスワードの変更をお願いいたします。

ご不明な点がございましたら、お気軽にご連絡ください。`;

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-black text-slate-900">
            保護者への案内
          </div>

          <div className="mt-1 text-sm font-bold text-slate-600">
            LINEへ貼り付けて送信できます
          </div>
        </div>

        <button
          type="button"
          onClick={copyMessage}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white"
        >
          📋 コピー
        </button>
      </div>

      {copied && (
        <div className="mt-3 rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
          コピーしました
        </div>
      )}

      <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-800">
        {message}
      </pre>
    </section>
  );
}