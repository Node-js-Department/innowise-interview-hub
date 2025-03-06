import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default SignInPage;

const LeftSection = () => {
  return (
    <section
      className="w-1/2 h-full"
      style={{
        background: 'url("/sign-in-big-banner.png") center center no-repeat',
        backgroundSize: "cover",
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          background:
            "linear-gradient(1.86deg, rgba(233, 57, 86, 0.7) -30.92%, rgba(0, 0, 0, 0.53) 98.5%)",
        }}
      >
        <Dots />
        <SignInCompanyInfo />
      </div>
    </section>
  );
};

const Dots = () => {
  return (
    <>
      <Image
        src="/dots-pane-1.svg"
        className="absolute bottom-0 left-0"
        alt="dots"
        width={176}
        height={106}
      />
      <Image
        src="/dots-pane-2.svg"
        className="absolute top-0 right-0"
        alt="dots"
        width={110}
        height={131}
      />
    </>
  );
};

const SignInCompanyInfo = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
      <SignInIcons />
      <h1 className="mt-12 mb-4 text-3xl font-bold">Innoview HUB</h1>
      <CompanyItems />
    </div>
  );
};

const SignInIcons = () => {
  const iconURLs = ["/hand.svg", "/people.svg", "/eye.svg", "/hands.svg"];

  return (
    <ul className="flex gap-x-4">
      {iconURLs.map((url, id) => (
        <li
          key={id}
          className="rounded-full border-2 flex items-center justify-center"
          style={{ width: 120, height: 120 }}
        >
          <Image src={url} alt="icon" width={50} height={50} />
        </li>
      ))}
    </ul>
  );
};

const CompanyItems = () => {
  const items = [
    "Registration and management of applications for absence, familiarization with the organizational structure of the company",
    "View and manage employee information, including skills and development plans",
    "Passing and management of organizational processes in the company (onboarding, offboarding, etc.)",
    "Faciliting of 1-to-1 meetings (collecting feedback from employees)",
  ];

  return (
    <ul className="max-w-[500px]">
      {items.map((item, id) => (
        <li key={id} className="text-lg leading-6 mb-2 font-semibold">
          <p>{item}</p>
          {id < items.length - 1 && (
            <span className="text-4xl font-bold ml-12">•</span>
          )}
        </li>
      ))}
    </ul>
  );
};

const RightSection = () => {
  return (
    <section className="bg-white flex-grow h-full relative">
      <SigninCard />
      <Version />
      <TechnicalSupport />
    </section>
  );
};

const SigninCard = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-4 justify-center items-center">
      <Image src="/logo.png" alt="logo" height={66} width={352} />
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Innautomation <span className="text-gray-600">Toolset</span>
      </h2>
      <GoogleButton />
    </div>
  );
};

const GoogleButton = () => {
  return (
    <Link
      href={`http://${process.env.CORE_SERVICE_HOST}:${process.env.CORE_SERVICE_PORT}/api/auth/google`}
      className="flex gap-x-4 items-center justify-center mt-4 w-[358px] border-2 border-[#757575] cursor-pointer h-[60px] rounded-[29px] bg-white hover:bg-[#ebebeb]"
    >
      <Image src="/google.svg" alt="google" width={28} height={28} />
      <p className="text-[#767676] font-semibold text-xl">Continue Google</p>
    </Link>
  );
};

const Version = () => {
  return (
    <p className="text-blue-500 absolute bottom-24 left-1/2 -translate-x-1/2">
      Version: 1.0
    </p>
  );
};

const TechnicalSupport = () => {
  return (
    <div
      className="absolute bottom-0 w-full text-center text-blue-500 py-2"
      style={{ boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.2)" }}
    >
      Technical Support
    </div>
  );
};
