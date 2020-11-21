import React, { useEffect, useState } from 'react';
import {
  Form,
  Grid,
  Table,
  Icon,
  Message,
  Input,
  Header,
  Segment,
  Button,
  Card,
} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main(props) {
  const { api } = useSubstrate();
  const [searchedBlockInfo, setSearchedBlockInfo] = useState();
  const [blockhash, setBlockhash] = useState();

  const getBlockHashInfo = async (blockhash) => {
    try {
      const blockInfo = await api.rpc.chain.getHeader(blockhash);
      setSearchedBlockInfo(blockInfo);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Grid.Column>
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Search by Block Hash</Header.Content>
      </Header>

      <Form
        onSubmit={async (e, { value }) => await getBlockHashInfo(blockhash)}
        size='samll'
      >
        <Input
          placeholder='Enter block hash...'
          onChange={(e, { value }) => setBlockhash(value)}
        />
        <Button type='submit' secondary>
          Search
        </Button>
      </Form>

      {searchedBlockInfo && (
        <>
          <Header as='h4'>
            <Header.Content>Searched Result</Header.Content>
          </Header>
          <Card fluid>
            <Card.Content textAlign='center'>
              <Card.Header>
                {'#' + searchedBlockInfo.number.toNumber()}
              </Card.Header>
              <Card.Meta>
                {'Hash ' + searchedBlockInfo.hash.toHuman()}
              </Card.Meta>
              <Card.Description>
                {'Parent Hash ' + searchedBlockInfo.parentHash.toHuman()}
              </Card.Description>
            </Card.Content>
          </Card>
        </>
      )}
    </Grid.Column>
  );
}

export default function SearchBlock(props) {
  const { api } = useSubstrate();
  return api.rpc && api.rpc.chain.getHeader ? <Main {...props} /> : null;
}
