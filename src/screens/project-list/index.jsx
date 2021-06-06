import qs from 'qs'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useMount, useDebounce } from '../../utils'

import { useState, useEffect } from 'react'

const apiUrl = process.env.REACT_APP_API_URL
export default function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
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
