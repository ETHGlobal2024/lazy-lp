import ConnectButton from "@/components/ConnectButton";
import NotificationModule from "@/components/NotificationModule";
import NotificationButton from "@/components/NotificationButton";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm f flex flex-col">
                Lazy LP
                <ConnectButton/>
                <NotificationModule/>
                <NotificationButton/>
            </div>
        </main>
    );
}
