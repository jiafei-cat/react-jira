/* eslint-disable react-hooks/exhaustive-deps */
import qs from 'qs'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useMount, useDebounce } from '../../utils'
import { useHttp } from '../../utils/http'

import { useState, useEffect } from 'react'

const apiUrl = process.env.REACT_APP_API_URL
export function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const client = useHttp()

  const debouncedParam = useDebounce(param, 1000)

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <>
      <SearchPanel
        param={param}
        users={users}
        setParam={setParam}></SearchPanel>
      <List list={list} users={users}></List>
    </>
  )
}
