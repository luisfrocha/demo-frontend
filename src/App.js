import {Disclosure} from '@headlessui/react';
import {parseISO, closestIndexTo, format, getTime, isEqual} from 'date-fns';
import {MenuIcon, XIcon, ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon} from '@heroicons/react/outline';
import ChartJSComponent from './components/ChartJSComponent';

import './App.css';
import data from './data';
import {useState} from 'react';

const navigation = [
  {name: 'Dashboard', href: '#', current: true},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const formatData = data => {
  let dates = [];
  data.forEach(team => {
    team.data.forEach(match => {
      dates.push(match.x);
    });
  });
  dates = [...new Set(dates)];
  dates = dates.map(date => parseISO(date));
  dates.sort((date1, date2) => getTime(date1) - getTime(date2));

  return data.map(team => {
    team.points = 0;
    team.goals = 0;
    dates.forEach((date, dateIndex) => {
      const foundDateIndex = team.data.findIndex(match => match.x === format(date, 'yyyy-MM-dd'));
      if (foundDateIndex === -1) {
        const index = closestIndexTo(date, team.data);
        const newDate = format(date, 'yyyy-MM-dd');
        team.data.splice(index, 0, {date, x: newDate, y: 0});
      } else {
        if (!!!team.data[foundDateIndex].date) {
          team.data[foundDateIndex].date = date;
        }
        if (dateIndex === 1 && !team.data[foundDateIndex].goals) {
          team.data[foundDateIndex].y = null;
        }
      }
    });
    team.data = team.data
      .sort((match1, match2) => getTime(match1.date) - getTime(match2.date))
      .map((match, matchIndex) => {
        if(matchIndex > 0){
          if (!!match.goals) {
            if (match.goals.favor > match.goals.against) {
              team.points += 3;
            } else if (match.goals.favor === match.goals.against) {
              team.points++;
            }
            team.goals += (match.goals.favor - match.goals.against);
            match.y = team.points + (team.goals * 0.1);
          } else if (!!team.data[matchIndex - 1] && matchIndex > 1) {
            match.y = team.data[matchIndex - 1].y;
          } else {
            match.y = null;
          }
        }
        return match;
      });
    return team;
  });
};

export default function MainComponent() {
  const [currentDateIndex, setCurrentDateIndex] = useState(4);

  const newData = formatData(data);
  const [scores] = useState(newData);
  const newLabels = scores[0].data.map(match => match.date);

  let scoreData;

  scoreData = scores.map(team => ({...team, data: team.data.filter(match => isEqual(match.date, newLabels[currentDateIndex]))}));
  scoreData.sort((team1, team2) => team1.data[0].y - team2.data[0].y);
  scoreData = scoreData.map((team, teamIndex) => ({...team, order: teamIndex}));

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-500 pb-32">
          <Disclosure as="nav" className="bg-gray-500 border-b border-gray-400 border-opacity-25 lg:border-none">
            {({open}) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                  <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-gray-300 lg:border-opacity-25">
                    <div className="px-2 flex items-center lg:px-0">
                      <div className="flex-shrink-0">
                        <img
                          className="block h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="hidden lg:block lg:ml-10">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-700 text-white'
                                  : 'text-white hover:bg-gray-500 hover:bg-opacity-75',
                                'rounded-md py-2 px-3 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-500 p-2 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-700 text-white'
                            : 'text-white hover:bg-gray-500 hover:bg-opacity-75',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 graph-container-div">
              {/* <GraphContainer data={scores} /> */}
              <ChartJSComponent data={scoreData} type={currentDateIndex === 0 || currentDateIndex === newLabels.length - 1 ? 'line' : 'bar'} />
              <div className="flex justify-between mt-3">
                <button
                  className={["inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", currentDateIndex === 0 ? 'pointer-events-none opacity-50' : null].join(' ')}
                  disabled={currentDateIndex === 0}
                  onClick={() => setCurrentDateIndex(0)}
                >
                  <ChevronDoubleLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  First
                </button>
                <button
                  className={["inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", currentDateIndex === 0 ? 'pointer-events-none opacity-50' : null].join(' ')}
                  disabled={currentDateIndex === 0}
                  onClick={() => setCurrentDateIndex(currentDateIndex => currentDateIndex - 1)}
                >
                  <ChevronLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                <span>{format(newLabels[currentDateIndex], 'MM/dd/yyyy')}</span>
                <button
                  className={["inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", currentDateIndex === newLabels.length - 1 ? 'pointer-events-none opacity-50' : null].join(' ')}
                  disabled={currentDateIndex === newLabels.length - 1}
                  onClick={() => setCurrentDateIndex(currentDateIndex => currentDateIndex + 1)}
                >
                  Next
                  <ChevronRightIcon className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  className={["inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", currentDateIndex === newLabels.length - 1 ? 'pointer-events-none opacity-50' : null].join(' ')}
                  disabled={currentDateIndex === newLabels.length - 1}
                  onClick={() => setCurrentDateIndex(newLabels.length - 1)}
                >
                  Last
                  <ChevronDoubleRightIcon className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
