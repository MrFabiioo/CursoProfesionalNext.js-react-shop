import { ProviderAuth } from '@hooks/useAuth';
import MainLayout from '@layaout/MainLayout';
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
return (
<>
<ProviderAuth>
<MainLayout>
<Component {...pageProps} />
</MainLayout>
</ProviderAuth>
</>
);
}

export default MyApp;