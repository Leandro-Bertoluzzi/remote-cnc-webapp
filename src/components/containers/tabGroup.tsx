import { Tabs } from "flowbite-react";
import TabGroupProps from "@/types/TabGroupProps";

export default function TabGroup(props: TabGroupProps) {
    const { items } = props;

    return (
        <Tabs aria-label="Default tabs" style="default">
            {items.map((item) => (
                <Tabs.Item key={item.title} title={item.title} icon={item.icon}>
                    {item.content}
                </Tabs.Item>
            ))}
        </Tabs>
    );
}
