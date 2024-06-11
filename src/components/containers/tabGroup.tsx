import { Accordion, Tabs } from "flowbite-react";
import TabGroupProps from "@/types/TabGroupProps";
import useScreenSize from "@/hooks/useScreenSize";

export default function TabGroup(props: TabGroupProps) {
    const screenSize = useScreenSize();
    const { items } = props;

    return screenSize.width > 768 ? (
        <Tabs aria-label="Default tabs" style="default">
            {items.map((item) => (
                <Tabs.Item key={item.title} title={item.title} icon={item.icon}>
                    {item.content}
                </Tabs.Item>
            ))}
        </Tabs>
    ) : (
        <Accordion>
            {items.map((item) => (
                <Accordion.Panel key={item.title}>
                    <Accordion.Title>{item.title}</Accordion.Title>
                    <Accordion.Content>{item.content}</Accordion.Content>
                </Accordion.Panel>
            ))}
        </Accordion>
    );
}
