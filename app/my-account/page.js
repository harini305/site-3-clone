import AccountForms from '@/components/shop/AccountForms';

export const metadata = {
  title: 'My Account',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 110 }}>
      <h1 className="sr-only">My account</h1>
      <AccountForms />
    </div>
  );
}
