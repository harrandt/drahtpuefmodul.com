import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridColumnMenu } from '@mui/x-data-grid';
import { getSingleMeasurements } from '../../../lib/measurement/api/measurement';
import { MeasurementResponse } from '../../../lib/measurement/model/Measurement';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getWires } from '@oh/shared/api-client';
import { DateTime } from 'luxon';

export const SingleHistory = () => {
    const [selectedParams, setSelectedParams] = useState<MeasurementResponse | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const measQuery = useQuery(['measurements', 'single'], () => getSingleMeasurements());
    
    const histdata: MeasurementResponse[] = measQuery.data ?? [];
    const { isLoading } = measQuery;

    const wiresQuery = useQuery(['wires'], () => getWires(true));
    const wires = wiresQuery.data ?? [];

    const columns: GridColDef<MeasurementResponse>[] | any[] = useMemo(
        () => [
            { field: 'id', headerName: `${t('WIRE_HISTORY_TABLE.MEASUREMENTID')}`, width: 270, hide: true },
            { field: 'name', headerName: `${t('WIRE_HISTORY_TABLE.Name')}`, width: 400, hide: true },
            { field: 'comment', headerName: `${t('WIRE_HISTORY_TABLE.COMMENT')}`, width: 500, hide: true },
            { field: 'type', headerName: `${t('WIRE_HISTORY_TABLE.TYPE')}`, width: 100, hide: true },
            { field: 'timestamp', headerName: `${t('WIRE_HISTORY_TABLE.DATE')}`, width: 400, hide: false },
            { field: 'state', headerName: `${t('WIRE_HISTORY_TABLE.STATE')}`, width: 200, hide: true ,
               valueGetter: ({row}) => {
                if(row.parent_id == null && row.state === 'finished')
                return row;
                else
                return null;
            }
            },
            { field: 'wirename', headerName: `${t('WIRE_HISTORY_TABLE.WIRE NAME')}`, width: 400, hide: false },
            {
                field: 'wireid',
                headerName: `${t('WIRE_HISTORY_TABLE.WIRE NAME')}`,
                width: 400,
                hide: true,
               /*   valueGetter: ({row}) => {
                const wiredetails = wires.find((c) => c.id === row.wire.id);
                return wiredetails?.name;
              }*/
            },
            {
                field: 'details',
                headerName: `${t('WIRE_HISTORY_TABLE.DETAILS')}`,
                sortable: false,
                disableColumnMenu: true, // To disable column filter options
                width: 70,
                hide: false,
                
                disableClickEventBubbling: true,
                renderCell: (params: any) => {
                    const onClickDisplay = async () => {
                        setSelectedParams(params);
                        navigate(`./singlehistory/${params.id}/${params.row.timestamp}/${params.row.wireid}`);
                    };
                    return (
                        <Tooltip title={t('WIRE_HISTORY_TABLE.SHOW DETAILS')} arrow>
                            <IconButton color="primary" onClick={onClickDisplay}>
                                <Search />
                            </IconButton>
                        </Tooltip>
                    );
                },
            },
        ],
        [navigate, t],
    );

    return (
        <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent sx={{ height: '100%', width: '100%' }}>
                {isLoading ? (
                    <p>{t('WIRE_HISTORY_TABLE.LOADING PLEASE WAIT')}</p>
                ) : (
                    <DataGrid
                        localeText={{
                            filterOperatorContains: `${t('WIRE_HISTORY_TABLE.CONTAINS')}`,
                            filterOperatorEquals: `${t('WIRE_HISTORY_TABLE.EQUALS')}`,
                            filterOperatorStartsWith: `${t('WIRE_HISTORY_TABLE.STARTS_WITH')}`,
                            filterOperatorEndsWith: `${t('WIRE_HISTORY_TABLE.ENDS_WITH')}`,
                            filterOperatorIsEmpty: `${t('WIRE_HISTORY_TABLE.IS_EMPTY')}`,
                            filterOperatorIsNotEmpty: `${t('WIRE_HISTORY_TABLE.IS_NOT_EMPTY')}`,
                            filterOperatorIsAnyOf: `${t('WIRE_HISTORY_TABLE.IS_ANY_OF')}`,
                        }}
                        slots={{
                            columnMenu: GridColumnMenu,
                        }}
                        slotProps={{
                            pagination: {
                                labelRowsPerPage: `${t('WIRE_HISTORY_TABLE.ROWS_PER_PAGE')}`,
                            },
                        }}
                        sx={{ height: '100%', width: '100%' }}
                        columns={columns.filter((col) => !col.hide)} // Code the hide columns fom filter options
                        rows={histdata
                            //.filter((x: MeasurementResponse) => x.state === 'finished' && x.parent_id === null) //Filter with state finished and parent id as null
                            //Filter rows with status as finished
                            .map((x: MeasurementResponse) => {
                                const wiredetails = wires.find((c) => c.id === x.wire.id); //Map wire id to wirename

                                const date = DateTime.fromISO(x.timestamp);
                                const date1 = date.toFormat('yyyy-MM-dd HH:MM:ss');
                                return {
                                    id: x.id,
                                    wirename: wiredetails?.name,
                                    wireid: x.wire.id,
                                    name: x.name,
                                    comment: x.comment,
                                    parent_id: x.parent_id,
                                    type: x.type,
                                    state: x.state,
                                    timestamp: date1,
                                };
                            })}
                        //Hide columns
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'timestamp', sort: 'desc' }],
                            },
                            pagination: { paginationModel: { pageSize: 10 } },
                            columns: {
                                columnVisibilityModel: {
                                    id: false,
                                    name: false,
                                    wireid: false,
                                    type: false,
                                    comment: false,
                                    state: false,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 20, 30]}
                        disableColumnSelector
                    />
                )}
            </CardContent>
        </Card>
    );
};
