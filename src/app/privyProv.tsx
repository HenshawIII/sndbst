'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="cma6k9trr00vol60mdysm5ic8"
      clientId="client-WY6L7Axrvy2TU4bfBJh9ccwtJ9AtNpzsD5T1Gg15dhWH5"
      config={{
        // Create embedded wallets for users who don't have a wallet
        appearance: {
            landingHeader: '',
            loginMessage: 'Phantom Agent',
            theme: 'light',
            accentColor: '#3351FF',
            showWalletLoginFirst: false,
            // logo: 'https://res.cloudinary.com/dbkthd6ck/image/upload/v1737309623/chainfren_logo_eey39b.png',
            
          },
          loginMethods: ['email', 'google', 'twitter',],
        embeddedWallets: {
          createOnLogin: undefined
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}