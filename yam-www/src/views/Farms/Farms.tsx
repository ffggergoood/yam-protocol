import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import farmer from '../../assets/img/farmer.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
      {!!account ? (
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img src={farmer} height="96" />}
              subtitle="通过提供流动性赚钱 LEEK 代币"
              title="选择一个实体资产池"
            />
            <FarmCards />
          </Route>
          <Route path={`${path}/:farmId`}>
            <Farm />
          </Route>
        </>
      ) : (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}>
          <Button
            onClick={onPresentWalletProviderModal}
            text="未解锁钱包"
          />
        </div>
      )}
      </Page>
    </Switch>
  )
}


export default Farms