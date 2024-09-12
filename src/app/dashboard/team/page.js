import TeamMemberList from "@/components/dashboard-layout/pages/team-layout/page";
import React from "react";

const page = () => {
  const dummyList = [
    {
      name: "Jason Price",
      status: "CEO",
      email: "janick_parisian@yahoo.com",
      img: "https://s3-alpha-sig.figma.com/img/fa25/e128/b04d061b8edaece04b9930857298c606?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J3KN~HYsRSCSYzoOCcBAQy8aV0tJegABlH9013ytRryciZogSHse0gtDMsMJHDuMcaywpw68c1KLEPONqoZMelWSBn7exk20bAFtkqedWbbVM-rvRUuJVjMtrywgL9DcjgTm8kOwTo9A8yMgcMkTMnzNys7PK0rzTHHNY2-lmMUYAwInJjJPSWAOZ5RSwIVa6BvKMyVlJniT3gc-ETODT7MpcUElwVuusNKpi28Ltutkk8rRkazbKwT8YawC~l~hW0oo8O4xU06MOdwqtHOEsyUTGWpBO7jy3XBhB7cINsyEL-M55Z1sHY32j9RcPcMecaYys1SgB5xBQ7Ms146ZiQ__",
    },
    {
      name: "Jukkoe Sisao",
      status: "STAFF",
      email: "sibyl_kozey@gmail.com",
      img: "https://s3-alpha-sig.figma.com/img/432c/8df9/789613f40b424715fac1035a8dc4ee87?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U422vRS57JeMScZbPsv1HrpCbPTf5btqj-qXCBXbJYoFu01opkEnM4Hz1~k51gyIuoB74ar95wA6YdTc-ts~zzgAYDrfw1KjYTx65q-M65SpNIlKix4xY4dyHEKLQAZe1no9No055y~By1mU-FOhfMVdGmnvfGN0Am8ooklMxXTQ5EmZQxDlsWBxEKJZxwXeZDRIMgLbJIzmRHgHmnT8Pxp3elxF6nBrsE0V6UaLBH60o43E1Qn1uqR7fUALjP~Ilryvfr9NpS-~dJ-~DH6lLCtOcaQh4uWq6ng9~4ofiSwzvQF3af32Nq0icF6FK0xixKzy5ud7Tqyemn2jaoqmtQ__",
    },
    {
      name: "Harriet King",
      status: "CEO",
      email: "nadia_block@hotmail.com",
      img: "https://s3-alpha-sig.figma.com/img/bb3a/3195/736f9b786e4cd0487f026a0579672641?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fYtiMYiM8Y1CNYu17brI31o0cF~D1ChpnXaXc5sWzgQUJ4esrZalbhi4h3a2ZJB1gHkq-I5n~X7N1uvhrNnl1caV7io0QnLRbAHAajHtncxFZIhtAnmszR6H-RlwmwIdQiXUlwAjOV9PxFfGsJsvOWjLb1f0-mf8iTesVKC56SxyygbgA9uG3DeMPXnq2zXds3FuesKQLBewqGbALgTPkDyTABAbT0p3qUAI86F8V~p0XDcC-ZmdQ~qiTE7dLNjHs5Jp8yAENTekh5r9V8NV0QsyqNn1Ubeiway8NeNhBOthts3H-7w1w4Y9-FmQw7Wt9X5A7JeWeSdEMvAMiB8Chg__",
    },
    {
      name: "Lenora Benson",
      status: "Lead",
      email: "feil.wallace@kunde.us",
      img: "https://s3-alpha-sig.figma.com/img/6a4a/3c04/2e8a0ba0f5d1f0e2036800f15a1559ea?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kjuR3RgVREAknoU-auS-98~QQjy2c7E3mf~zKQecv95ugnloZOO7gLVk~rZXARaXgpMHR6OKGbP4SgKbD6XVdA7cGr92wLNUClE4lsUUGqz37Et8fY3Iu27BPIWW94-C4focgalL3~whTsECyrzSkSF3opZmZWYrHFgBM2OZNdRn3TH-FFpHigu6d1DahHKYnE~sGAmBjiVIp1bTBWY1WWcQ7j4Ud6NiGhfgZ1aJ9qJ1tgh~MBrTVtVB3PT4OIA78PgaLmfFukc4qB6qE5Z~mE5KS0cE~fyimqgdtKH2dQS6~xlEv2QfBfxQP0QrMdF900wnJKYrWZSb~oomE0-fJA__",
    },
    {
      name: "Olivia Reese",
      status: "Strategist",
      email: "kemmer.hattie@cremin.us",
      img: "https://s3-alpha-sig.figma.com/img/9cec/76b1/2c4b34e50d59c5c324ff74a6910a6a7e?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hUS-gRCRxlt8HOcDR4FMjQc3Qjkybyx8ZnSscUGb9jLUpDX9qCnUidkWXea0wRjyH2vVUtFXU-rL-WOXEfyDp6xfjr4P306uSZIgnxkEM5PdosrOAijWeauHYfyiyH6ysv0sszq4RrWiN9-Va-PiyABBC4cKAUEQecyIpGNIrSPEZQuXjDX1PAE0EjNpyEdjvE4zTRPjVX2S3tQptQ~cuao-KvT1NFwM5wJ0Dv86NMF5SQbF6B9tXXLAeIT0IY1Y3x5AGJYgN8D7n0lxqyp8b9~y3vIqRxKh3KEIaibJv0xHQ0q4EjJn~lPMftdIJIX3lNzfx25hQ4BQXw9k9YG~vQ__",
    },
    {
      name: "Bertha Valdez",
      status: "CEO",
      email: "loraine.koelpin@tromp.io",
      img: "https://s3-alpha-sig.figma.com/img/789e/69c7/7a301eb3808cf36e8936f5ebae199483?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TS5IQ3aqBj7ctyJxxAjoioiJhdOKkh1N2M4Qe~pFY2RVhntH8YnKIj0cWv8ENyjW9N-PqJvUyjLeYQ3JvStlS-LrlPTJuXli2UYXSjO4UUqMtRZvugS0yVvF0cYbtfxV5iI1X2DcgLgmkuyXrgtOKHovRLIE5hpMvRYIWoDUUxZN6-k0B3NGZuyVXm-8qmJaaq-Em3N2Fe2pAZxzGOQ6XebXmSBb5-lT57XdA7E3c34jVCVLkAy9Qyzeaf8nxDb8DRLqZTh2MVNN55be8NFP5pRS4J1lroPhM6y86UG7R415jAcVUGSiicQFDNhviZzdzN1O1m16EbZjWyyv1WODWQ__",
    },
    {
      name: "Harriett Payne",
      status: "Digital Marketer",
      email: "nannie_west@estrella.tv",
      img: "https://s3-alpha-sig.figma.com/img/8b6c/8fa8/e573bb6bb5f962ef6b86b3f49d63b4ec?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ppPSuFpMEkQuPWrvrciJa91XanRuEMnBjDY0iWk4fnBArF6dXMOhm4HRXRMjSOWuxAt9Ps~e9NVsnQ-GVeeePdR78Liagqvd-WR--IjwZaPY23aG~uX-HYwkOQaS6til2pLtCHxjFi4SCtCebmChZNJBN0YAQb8CeHYjLVhKhzGtnCr6weXBJEtg8Af79LczwBTBhQUkg8qGOe1ivhj47~JtA3IBiN~pHRTFDjHV9pY6u8C9dtEajDv8Ak-Dlc8Nf0sWoxCL36Dn43SU1-m3KN1Na0OhWMYq8Zvgtxk-Jm6dC6tpRKhVIaXhd-STcSULpwjTyOY4GfbeWvv5ViZHRg__",
    },
    {
      name: "George Bryant",
      status: "Social Media",
      email: "delmer.kling@gmail.com",
      img: "https://s3-alpha-sig.figma.com/img/96ee/1f79/ada5889e0a3d6f16ca83b9c31a066c2c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KGT16U1FXCNK2O40BQzebkRjsXrf9gUXjeOl0gq9BCd8gEu2HUWOsPXzWPhJ2k2nwjLnNNFtQrs4ik3ekhYkFrk-MANnTv9JlKJ0EorBgen~9klWDb2TZC-5OUPmJxYtypudabyWkT~8tveCjfstSdq2b3C5tHcDmywwqLMSTCgKgvdYAhhwqL16rGUxt6mGmGCpOVb22uZMJ1v~1QrQbMharm8x~fJ3~DFWLhSibJrAHx5w78fmBaae-oOJJpOWWCzWzcHPD67Mp-wdjg5N0KRtN4oE8VRhdpLAnOZVHt3ynahHvneynxZQkoRn9K3hdcFvJzPnKcvX~nqTXhRrzA__",
    },
    {
      name: "Jason Price",
      status: "CEO",
      email: "janick_parisian@yahoo.com",
      img: "https://s3-alpha-sig.figma.com/img/fa25/e128/b04d061b8edaece04b9930857298c606?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J3KN~HYsRSCSYzoOCcBAQy8aV0tJegABlH9013ytRryciZogSHse0gtDMsMJHDuMcaywpw68c1KLEPONqoZMelWSBn7exk20bAFtkqedWbbVM-rvRUuJVjMtrywgL9DcjgTm8kOwTo9A8yMgcMkTMnzNys7PK0rzTHHNY2-lmMUYAwInJjJPSWAOZ5RSwIVa6BvKMyVlJniT3gc-ETODT7MpcUElwVuusNKpi28Ltutkk8rRkazbKwT8YawC~l~hW0oo8O4xU06MOdwqtHOEsyUTGWpBO7jy3XBhB7cINsyEL-M55Z1sHY32j9RcPcMecaYys1SgB5xBQ7Ms146ZiQ__",
    },
    {
      name: "Jukkoe Sisao",
      status: "STAFF",
      email: "sibyl_kozey@gmail.com",
      img: "https://s3-alpha-sig.figma.com/img/432c/8df9/789613f40b424715fac1035a8dc4ee87?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U422vRS57JeMScZbPsv1HrpCbPTf5btqj-qXCBXbJYoFu01opkEnM4Hz1~k51gyIuoB74ar95wA6YdTc-ts~zzgAYDrfw1KjYTx65q-M65SpNIlKix4xY4dyHEKLQAZe1no9No055y~By1mU-FOhfMVdGmnvfGN0Am8ooklMxXTQ5EmZQxDlsWBxEKJZxwXeZDRIMgLbJIzmRHgHmnT8Pxp3elxF6nBrsE0V6UaLBH60o43E1Qn1uqR7fUALjP~Ilryvfr9NpS-~dJ-~DH6lLCtOcaQh4uWq6ng9~4ofiSwzvQF3af32Nq0icF6FK0xixKzy5ud7Tqyemn2jaoqmtQ__",
    },
    {
      name: "Harriet King",
      status: "CEO",
      email: "nadia_block@hotmail.com",
      img: "https://s3-alpha-sig.figma.com/img/bb3a/3195/736f9b786e4cd0487f026a0579672641?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fYtiMYiM8Y1CNYu17brI31o0cF~D1ChpnXaXc5sWzgQUJ4esrZalbhi4h3a2ZJB1gHkq-I5n~X7N1uvhrNnl1caV7io0QnLRbAHAajHtncxFZIhtAnmszR6H-RlwmwIdQiXUlwAjOV9PxFfGsJsvOWjLb1f0-mf8iTesVKC56SxyygbgA9uG3DeMPXnq2zXds3FuesKQLBewqGbALgTPkDyTABAbT0p3qUAI86F8V~p0XDcC-ZmdQ~qiTE7dLNjHs5Jp8yAENTekh5r9V8NV0QsyqNn1Ubeiway8NeNhBOthts3H-7w1w4Y9-FmQw7Wt9X5A7JeWeSdEMvAMiB8Chg__",
    },
    {
      name: "Lenora Benson",
      status: "Lead",
      email: "feil.wallace@kunde.us",
      img: "https://s3-alpha-sig.figma.com/img/6a4a/3c04/2e8a0ba0f5d1f0e2036800f15a1559ea?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kjuR3RgVREAknoU-auS-98~QQjy2c7E3mf~zKQecv95ugnloZOO7gLVk~rZXARaXgpMHR6OKGbP4SgKbD6XVdA7cGr92wLNUClE4lsUUGqz37Et8fY3Iu27BPIWW94-C4focgalL3~whTsECyrzSkSF3opZmZWYrHFgBM2OZNdRn3TH-FFpHigu6d1DahHKYnE~sGAmBjiVIp1bTBWY1WWcQ7j4Ud6NiGhfgZ1aJ9qJ1tgh~MBrTVtVB3PT4OIA78PgaLmfFukc4qB6qE5Z~mE5KS0cE~fyimqgdtKH2dQS6~xlEv2QfBfxQP0QrMdF900wnJKYrWZSb~oomE0-fJA__",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <TeamMemberList memberList={dummyList} />
    </div>
  );
};

export default page;
