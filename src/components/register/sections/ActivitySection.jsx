import React from 'react';
import { getInputStyles } from '../../../utils/formStyles';

// 활동 개요서 섹션 컴포넌트
const ActivitySection = ({ formData, errors, setFormData, setIsPersonnelModalOpen, setIsEquipmentModalOpen }) => {
  return (
    <div className="space-y-8">
      {/* 교육프로그램 내용 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">교육프로그램 내용</h3>
        </div>
        <div className="lg:col-span-3">
          <textarea
            className={getInputStyles(errors.programContent, formData.programContent)}
            placeholder="내용 입력"
            value={formData.programContent}
            onChange={e => setFormData(prev => ({ ...prev, programContent: e.target.value }))}
            rows={4}
          />
          {errors.programContent && <p className="mt-1 text-sm text-red-600">{errors.programContent}</p>}
        </div>
      </div>

      {/* 전담인력과 강의인력 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">전담인력과 강의인력</h3>
        </div>
        <div className="lg:col-span-3">
          {errors.personnel && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.personnel}
              </p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[1400px]">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[100px]">
                    구분
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[120px]">
                    직위
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[120px]">
                    이름
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[130px]">
                    생년월일
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[150px]">
                    최종학교
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[100px]">
                    학위
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[120px]">
                    전문분야
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[130px]">
                    입사일자
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[100px]">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.personnel.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      등록된 인력이 없습니다. "인력 추가" 버튼을 클릭하여 인력을 추가해주세요.
                    </td>
                  </tr>
                ) : (
                  formData.personnel.map(person => (
                    <tr key={person.id}>
                      <td className="border border-gray-300 px-3 py-4">
                        <select
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white focus:outline-none relative z-10 pointer-events-auto"
                          value={person.type}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, type: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                        >
                          <option value="강의">강의</option>
                          <option value="전담">전담</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.position}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, position: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="직위"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.name}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, name: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="이름"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.birthDate}
                          onChange={e => {
                            // 숫자만 허용
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p => (p.id === person.id ? { ...p, birthDate: value } : p)),
                            }));
                          }}
                          onKeyPress={e => {
                            // 숫자가 아닌 키는 입력 차단
                            if (
                              !/[0-9]/.test(e.key) &&
                              !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="YYYYMMDD"
                          maxLength={8}
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.school}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, school: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="학교명"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.degree}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, degree: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="학위"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                          value={person.specialty}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.map(p =>
                                p.id === person.id ? { ...p, specialty: e.target.value } : p
                              ),
                            }));
                          }}
                          onBlur={e => e.target.blur()}
                          onMouseLeave={e => {
                            setTimeout(() => {
                              if (document.activeElement === e.target) {
                                e.target.blur();
                              }
                            }, 100);
                          }}
                          placeholder="전문분야"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <div className="relative isolate">
                          <input
                            type="date"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none relative z-10 pointer-events-auto"
                            value={person.joinDate}
                            onChange={e => {
                              setFormData(prev => ({
                                ...prev,
                                personnel: prev.personnel.map(p =>
                                  p.id === person.id ? { ...p, joinDate: e.target.value } : p
                                ),
                              }));
                            }}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              personnel: prev.personnel.filter(p => p.id !== person.id),
                            }));
                          }}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setIsPersonnelModalOpen(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              인력 추가
            </button>
            <div className="flex space-x-4 text-sm">
              <span>전담인력: {formData.personnel.filter(p => p.type === '전담').length}</span>
              <span>강의인력: {formData.personnel.filter(p => p.type === '강의').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 교육장비 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">교육장비</h3>
        </div>
        <div className="lg:col-span-3">
          {errors.equipment && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.equipment}
              </p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[80px]">No.</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[150px]">
                    장비명
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[200px]">
                    용도
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[100px]">
                    수량
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[150px]">
                    비고
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900 w-[100px]">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.equipment.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      등록된 교육장비가 없습니다. "장비 추가" 버튼을 클릭하여 장비를 추가해주세요.
                    </td>
                  </tr>
                ) : (
                  formData.equipment.map(item => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="number"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed transition-all relative z-10 pointer-events-none"
                          value={item.order}
                          readOnly
                          min="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all relative z-10 pointer-events-auto"
                          value={item.name}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              equipment: prev.equipment.map(eq =>
                                eq.id === item.id ? { ...eq, name: e.target.value } : eq
                              ),
                            }));
                          }}
                          placeholder="장비명"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all relative z-10 pointer-events-auto"
                          value={item.purpose}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              equipment: prev.equipment.map(eq =>
                                eq.id === item.id ? { ...eq, purpose: e.target.value } : eq
                              ),
                            }));
                          }}
                          placeholder="용도"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all relative z-10 pointer-events-auto"
                          value={item.quantity}
                          onChange={e => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({
                              ...prev,
                              equipment: prev.equipment.map(eq =>
                                eq.id === item.id ? { ...eq, quantity: value } : eq
                              ),
                            }));
                          }}
                          onKeyPress={e => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="수량"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all relative z-10 pointer-events-auto"
                          value={item.remarks}
                          onChange={e => {
                            setFormData(prev => ({
                              ...prev,
                              equipment: prev.equipment.map(eq =>
                                eq.id === item.id ? { ...eq, remarks: e.target.value } : eq
                              ),
                            }));
                          }}
                          placeholder="비고"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              equipment: prev.equipment.filter(eq => eq.id !== item.id),
                            }));
                          }}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setIsEquipmentModalOpen(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              장비 추가
            </button>
            <div className="flex space-x-4 text-sm">
              <span>총 장비: {formData.equipment.length}개</span>
            </div>
          </div>
        </div>
      </div>

      {/* 첨부파일 섹션들 */}
      {errors.activityFiles && typeof errors.activityFiles === 'string' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.activityFiles}
          </p>
        </div>
      )}

      {/* 개별 첨부파일 에러 메시지 */}
      {errors.activityFiles && typeof errors.activityFiles === 'object' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center mb-2">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            다음 첨부파일들을 업로드해주세요:
          </p>
          <ul className="text-sm text-red-600 ml-6 list-disc">
            {errors.activityFiles.organizationChart && <li>{errors.activityFiles.organizationChart}</li>}
            {errors.activityFiles.trainingOrganization && <li>{errors.activityFiles.trainingOrganization}</li>}
            {errors.activityFiles.trainingFloorPlan && <li>{errors.activityFiles.trainingFloorPlan}</li>}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">기업의 조직도 (첨부)</h3>
        </div>
        <div className="lg:col-span-3">
          <div
            className={`w-full px-4 py-3 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer ${
              errors.activityFiles?.organizationChart ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  activityFiles: {
                    ...prev.activityFiles,
                    organizationChart: e.target.files[0],
                  },
                }));
              }}
              className="hidden"
              id="organizationChart"
            />
            <label htmlFor="organizationChart" className="cursor-pointer block text-center py-4">
              {formData.activityFiles.organizationChart ? (
                <span className="text-green-600">✓ {formData.activityFiles.organizationChart.name}</span>
              ) : (
                <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
              )}
            </label>
          </div>
          {errors.activityFiles?.organizationChart && (
            <p className="mt-1 text-sm text-red-600">{errors.activityFiles.organizationChart}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">기업부설 교육훈련기관 조직 (첨부)</h3>
        </div>
        <div className="lg:col-span-3">
          <div
            className={`w-full px-4 py-3 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer ${
              errors.activityFiles?.trainingOrganization ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  activityFiles: {
                    ...prev.activityFiles,
                    trainingOrganization: e.target.files[0],
                  },
                }));
              }}
              className="hidden"
              id="trainingOrganization"
            />
            <label htmlFor="trainingOrganization" className="cursor-pointer block text-center py-4">
              {formData.activityFiles.trainingOrganization ? (
                <span className="text-green-600">✓ {formData.activityFiles.trainingOrganization.name}</span>
              ) : (
                <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
              )}
            </label>
          </div>
          {errors.activityFiles?.trainingOrganization && (
            <p className="mt-1 text-sm text-red-600">{errors.activityFiles.trainingOrganization}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900">교육훈련부서 전체 도면 및 내부 도면 (첨부)</h3>
        </div>
        <div className="lg:col-span-3">
          <div
            className={`w-full px-4 py-3 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer ${
              errors.activityFiles?.trainingFloorPlan ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  activityFiles: {
                    ...prev.activityFiles,
                    trainingFloorPlan: e.target.files[0],
                  },
                }));
              }}
              className="hidden"
              id="trainingFloorPlan"
            />
            <label htmlFor="trainingFloorPlan" className="cursor-pointer block text-center py-4">
              {formData.activityFiles.trainingFloorPlan ? (
                <span className="text-green-600">✓ {formData.activityFiles.trainingFloorPlan.name}</span>
              ) : (
                <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
              )}
            </label>
          </div>
          {errors.activityFiles?.trainingFloorPlan && (
            <p className="mt-1 text-sm text-red-600">{errors.activityFiles.trainingFloorPlan}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
