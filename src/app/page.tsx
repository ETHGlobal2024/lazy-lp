import ConnectButton from "@/components/W3R/ConnectButton";
import NotificationModule from "@/components/W3R/NotificationModule";
import NotificationButton from "@/components/W3R/NotificationButton";
import {ModeToggle} from "@/components/ui/theme-toggle";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm f flex flex-col">
                <ModeToggle/>
                Lazy LP
                <ConnectButton/>
                <NotificationModule/>
                <NotificationButton/>
            </div>
        </main>
    );
}
