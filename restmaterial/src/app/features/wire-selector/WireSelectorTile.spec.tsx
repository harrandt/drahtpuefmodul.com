import { render, screen } from '@testing-library/react';
import { WireSelectorTile } from './WireSelectorTile';
import { Wire } from '@oh/shared/models';
import { randomUUID } from 'crypto';
import userEvent from '@testing-library/user-event';

const wires: Wire[] = [
    {
        id: randomUUID(),
        name: 'wire1',
        refractive_index: 1,
    },
    {
        id: randomUUID(),
        name: 'wire2',
        refractive_index: 1,
    },
];

const setup = ({ allowNewWire = false, initialWireId }: { allowNewWire?: boolean; initialWireId?: string } = {}) => {
    const handleSelectMock = vitest.fn();
    const clickTile = async () => userEvent.click(screen.getByRole('button', { name: /SELECT WIRE/ }));
    const clickOption = async (name: RegExp | string) => userEvent.click(screen.getByRole('option', { name }));

    render(
        <WireSelectorTile
            onSelect={handleSelectMock}
            selectedWireId={initialWireId}
            wires={wires}
            allowNewWire={allowNewWire}
        />,
    );

    return { clickTile, handleSelectMock, clickOption };
};

it('should show all options', async () => {
    const { clickTile } = setup();
    await clickTile();

    expect(screen.getAllByRole('option')).toHaveLength(2);
});

it('should show current value', () => {
    const { name, id } = wires[0];
    setup({ initialWireId: id });

    expect(screen.getByText(name)).toBeInTheDocument();
});

it('should call onSelect with selected wire id', async () => {
    const { clickTile, clickOption, handleSelectMock } = setup();

    await clickTile();
    const { id, name } = wires[0];

    await clickOption(name);

    expect(handleSelectMock).toHaveBeenCalledTimes(1);
    expect(handleSelectMock).toHaveBeenCalledWith(id);
});

describe('allowNewWire=true', () => {
    it('should show "Add Wire" text when no wire is selected', () => {
        setup({ allowNewWire: true, initialWireId: undefined });

        expect(screen.getByText('ADD WIRE')).toBeInTheDocument();
    });

    it('should show "Add Wire" option', async () => {
        const { clickTile } = setup({ allowNewWire: true });
        await clickTile();

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('ADD WIRE');
    });

    it('should call onSelect with undefined when selecting "Add Wire" option', async () => {
        const { clickTile, clickOption, handleSelectMock } = setup({ allowNewWire: true, initialWireId: wires[0].id });
        await clickTile();

        await clickOption('ADD WIRE');

        expect(handleSelectMock).toHaveBeenCalledTimes(1);
        expect(handleSelectMock).toHaveBeenCalledWith(undefined);
    });
});
